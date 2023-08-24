import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ProductDetails from "../components/ProductDetails";
import Navbar from "../components/Navbar";
import { CartContext } from "../contexts/cart-context";
import { AuthContext } from "../contexts/auth-context";

const CartSlider = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.active ? "0%" : "-600px")};
  height: 100vh;
  width: 600px;
  background-color: white;
  z-index: 3;
  box-sizing: border-box;
  padding: 100px 50px;
  font-family: "Nunito Sans";
  display: flex;
  align-items: center;
  transition: all 400ms ease;
`;

const Button = styled.button`
  padding: 15px 25px;
  border: none;
  color: white;
  border-radius: 10px;
  background-color: ${(props) =>
    props.context === "cart" ? "#e03131" : "#1971c2"};
  font-size: 16px;
  margin: 0 10px 0 0;
  cursor: pointer;
`;

const Screen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  opacity: ${(props) => (props.active ? "1" : "0")};
  pointer-events: ${(props) => (props.active ? "all" : "none")};
  transition: all 400ms ease;
`;

const SliderImage = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 0 auto;
`;

const SliderContent = styled.div``;

const Product = () => {
  const [data, setData] = useState();
  const [showSlider, setShowSlider] = useState(false);
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const params = useParams();

  const getData = () => {
    fetch(`http://localhost:8000/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const renderSlider = () => {
    return (
      <>
        <Screen active={showSlider} onClick={() => setShowSlider(false)} />
        <CartSlider active={showSlider}>
          <SliderContent>
            <h1>Added to Cart</h1>
            <SliderImage src={data.imageUrl} />
            <h3>{data.title}</h3>
            <h3>Total: &#8377;{cartCtx.total}</h3>
            <Button context="cart" onClick={() => navigate("/cart")}>
              Go To Cart
            </Button>
            <Button
              onClick={() => {
                if (authCtx.userid)
                  navigate("/placeOrder", { state: { context: "cart" } });
                else navigate("/login", { state: { context: "cart" } });
              }}
            >
              Proceed to Payment
            </Button>
          </SliderContent>
        </CartSlider>
      </>
    );
  };

  useEffect(() => getData(), []);

  if (!data) return <Loading />;
  return (
    <>
      <Navbar />
      {renderSlider()}
      <ProductDetails product={data} onAdd={() => setShowSlider(true)} />;
    </>
  );
};

export default Product;
