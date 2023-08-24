import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart-context";
import { AuthContext } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const ImageCard = styled.div`
  position: relative;
  margin: 50px auto;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: fill;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3.2fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 90%;
  height: 450px;
  margin: 0 auto;
`;

const PriceCard = styled.div`
  width: 200px;
  height: 200px;
  padding: 20px;
  background-color: #eee;
  border-radius: 20px;
  font-family: "Nunito Sans";
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const PriceCardButton = styled.div`
  height: 40px;
  width: 120px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) =>
    props.type === "buy" ? "#1971c2" : "#e03131"};
  font-size: 16px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
`;

const PriceCardContent = styled.div`
  text-align: center;
`;

const Quantity = styled.div`
  display: flex;
  font-size: 16px;
  gap: 10px;
  margin: 10px auto;
`;

const Container = styled.div`
  width: 93%;
  margin: 0 auto;
  font-family: "Nunito Sans";
  line-height: 1.8;
`;

const Price = styled.div`
  margin: 10px auto;
`;

const ProductDescription = styled.p`
  line-height: 1.8;
`;

const ProductDetails = (props) => {
  const [count, setCount] = useState(1);
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const cartHandler = () => {
    const product = {
      _id: props.product._id,
      imageUrl: props.product.imageUrl,
      price: props.product.price,
      title: props.product.title,
    };
    cartCtx.onAddToCart(product, count);
    props.onAdd();
    setCount(1);
  };

  const buyHandler = () => {
    const order = {
      item: props.product._id,
      count: count,
      total: props.product.price * count,
    };
    localStorage.setItem("order", JSON.stringify(order));
    if (authCtx.userid)
      navigate("/placeOrder", { state: { context: "buy now" } });
    else navigate("/login", { state: { context: "buy now" } });
  };

  const increment = () => {
    setCount((count) => count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount((count) => count - 1);
  };

  const renderPriceCard = () => {
    return (
      <PriceCard>
        <PriceCardContent>
          <Price>&#8377;{props.product.price}</Price>
          <Quantity>
            Quantity:
            <button onClick={decrement}>-</button>
            {count}
            <button onClick={increment}>+</button>
          </Quantity>
          <PriceCardButton type="buy" onClick={buyHandler}>
            Buy Now
          </PriceCardButton>
          <PriceCardButton type="cart" onClick={cartHandler}>
            Add to Cart
          </PriceCardButton>
        </PriceCardContent>
      </PriceCard>
    );
  };

  return (
    <Container>
      <h1>{props.product.title}</h1>
      <Grid>
        <ImageCard>
          <Image src={props.product.imageUrl} />
        </ImageCard>
        <div>{renderPriceCard()}</div>
      </Grid>
      <ProductDescription>{props.product.description}</ProductDescription>
    </Container>
  );
};

export default ProductDetails;
