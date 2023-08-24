import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// PRODUCT CARD STYLES

const Card = styled.div`
  width: 600px;
  height: 300px;
  font-family: "Nunito Sans";
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: fill;
`;

// PRODUCT CARD COMPONENT CODE

const ProductCard = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/products/${props.product._id}`);
  };

  return (
    <Card onClick={clickHandler}>
      <Image src={props.product.imageUrl} />
      <h3>{props.product.title}</h3>
    </Card>
  );
};

export default ProductCard;
