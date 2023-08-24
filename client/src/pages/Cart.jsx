import styled from "styled-components";
import CartCard from "../components/CartCard";
import Navbar from "../components/Navbar";
import { CartContext } from "../contexts/cart-context";
import { AuthContext } from "../contexts/auth-context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  font-family: "Nunito Sans";
  display: grid;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 20px;
`;

const CardsContainer = styled.div`
  width: 100%;
`;

const TotalCard = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-direction: column;
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

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const formSubmitHandler = () => {
    if (authCtx.token) navigate("/placeOrder", { state: { context: "cart" } });
    else navigate("/login", { state: { context: "cart" } });
  };

  const renderCartItems = (items) => {
    return items.map((item, i) => <CartCard key={i} item={item} />);
  };

  const renderCart = (itemsCount) => {
    if (itemsCount === 0) return <p>No items in Cart</p>;
    return (
      <CartGrid>
        <CardsContainer>{renderCartItems(cartCtx.items)}</CardsContainer>
        <TotalCard>
          &#8377;{cartCtx.total}
          <Button onClick={formSubmitHandler} colour="#e03131">
            Place Order
          </Button>
        </TotalCard>
      </CartGrid>
    );
  };

  return (
    <>
      <Navbar />
      <CartContainer>
        <h2>Shopping Cart</h2>
        {renderCart(cartCtx.itemsCount)}
      </CartContainer>
    </>
  );
};

export default Cart;
