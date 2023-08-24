import styled from "styled-components";
import { Link } from "react-router-dom";

const OrderCardContainer = styled.div`
  width: 80%;
  background-color: #eee;
  border-radius: 30px;
  padding: 20px;
  margin: 20px auto;
  font-family: "Nunito Sans";
`;

const OrderCardImage = styled.img`
  width: 400px;
  object-fit: cover;
`;

const OrderDetails = styled.div`
  display: flex;
  gap: 20px;
  margin: 60px 30px;
`;

const OrderData = styled.div`
  display: flex;
  gap: 30px;
`;

const OrderCard = (props) => {
  return (
    <OrderCardContainer>
      <OrderData>
        <p>Total: {props.total}</p>
        <p>Ordered on: {props.date.toString().substring(0, 10)}</p>
      </OrderData>
      {props.items.map((item) => {
        return (
          <OrderDetails>
            <OrderCardImage src={item.item.imageUrl} />
            <div>
              <Link to={`/products/${item.item._id}`}>{item.item.title}</Link>
              <p>Price: {item.item.price}</p>
              <p>Qty: {item.count}</p>
            </div>
          </OrderDetails>
        );
      })}
    </OrderCardContainer>
  );
};

export default OrderCard;
