import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart-context";
import { AuthContext } from "../contexts/auth-context";
import { DropdownContext } from "../contexts/dropdown-context";
import { Link, useNavigate } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  height: 80px;
`;

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
`;

const NavLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Logo = styled.img`
  width: 160px;
`;

const NavCenter = styled.div`
  flex: 2;
`;

const NavRight = styled.div`
  flex: 1;
  gap: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const CartIconContainer = styled.div`
  cursor: pointer;
  position: relative;
`;

const Button = styled.button`
  padding: 15px 40px;
  border: none;
  color: white;
  border-radius: 10px;
  background-color: ${(props) => props.colour};
  font-size: 14px;
  cursor: pointer;
  margin: 10px 0;
`;

const CartItemCount = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  position: absolute;
  top: -8px;
  left: 10px;
  background-color: #ccc;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: "Nunito Sans";
  pointer-events: none;
`;

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
`;

const User = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  font-family: "Nunito Sans";
  cursor: pointer;
  position: relative;
  height: 100%;
  width: 160px;
  box-sizing: border-box;
  background-color: ${(props) => (props.showUserDropdown ? "#eee" : "#fff")};
  transition: all 400ms ease;
`;

const UserCard = styled.div`
  background-color: #eee;
  position: absolute;
  top: 70px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border-radius: 10px;
  opacity: ${(props) => (props.showUserDropdown ? "1" : "0")};
  pointer-events: ${(props) => (props.showUserDropdown ? "all" : "none")};
  transition: all 400ms ease;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: "Nunito Sans";
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

const Navbar = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const dropdownCtx = useContext(DropdownContext);
  const navigate = useNavigate();

  const renderUserOptions = () => {
    return (
      <UserCard showUserDropdown={dropdownCtx.showUserDropdown}>
        <Button onClick={authCtx.logout} colour="#e03131">
          Logout
        </Button>
        <Button
          colour="#1971c2"
          onClick={(e) => {
            e.stopPropagation();
            dropdownCtx.onUserClick(false);
            navigate("/orders");
          }}
        >
          Orders
        </Button>
      </UserCard>
    );
  };

  const renderLoggedInUser = () => {
    if (!authCtx.userid) return <StyledLink to="/login">Login</StyledLink>;
    return (
      <User
        showUserDropdown={dropdownCtx.showUserDropdown}
        onClick={(e) => {
          e.stopPropagation();
          dropdownCtx.onUserClick(true);
        }}
      >
        <UserImage src="/instagram-default-profile-picture-11562973083brycehrmyv-removebg-preview.png" />
        <p>{authCtx.username}</p>
        {renderUserOptions()}
      </User>
    );
  };

  const renderCartItemCount = (itemCount) => {
    if (itemCount > 0)
      return <CartItemCount>{cartCtx.itemsCount}</CartItemCount>;
    return null;
  };

  return (
    <Nav>
      <Container>
        <NavLeft>
          <Link to="/">
            <Logo src="/logo.png" />
          </Link>
        </NavLeft>
        <NavCenter />
        <NavRight>
          {renderLoggedInUser()}
          <CartIconContainer
            onClick={() => {
              navigate("/cart");
            }}
          >
            {renderCartItemCount(cartCtx.itemsCount)}
            <ShoppingCartOutlinedIcon />
          </CartIconContainer>
        </NavRight>
      </Container>
    </Nav>
  );
};

export default Navbar;
