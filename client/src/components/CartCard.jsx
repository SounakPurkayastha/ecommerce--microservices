import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/cart-context";
import { useContext } from "react";

const Card = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin: 20px auto;
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 5fr;
  gap: 30px;
`;

const CardImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const CardDetails = styled.div``;

const CartCard = (props) => {
  const cartCtx = useContext(CartContext);

  const increment = () => {
    cartCtx.onAddToCart(props.item.product, 1);
  };

  const decrement = () => {
    cartCtx.onDecrement(props.item.product);
  };

  return (
    <Card>
      <CardImageContainer>
        <CardImage src={props.item.product.imageUrl} />
      </CardImageContainer>
      <CardDetails>
        <Link to={`/products/${props.item.product._id}`}>
          {props.item.product.title}
        </Link>
        <p>
          Qty: <button onClick={decrement}>-</button> {props.item.count}{" "}
          <button onClick={increment}>+</button>
        </p>
        <button onClick={() => cartCtx.onRemove(props.item.product)}>
          Delete
        </button>
      </CardDetails>
    </Card>
  );
};

export default CartCard;
