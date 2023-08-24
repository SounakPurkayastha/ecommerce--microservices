import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import OrderCard from "../components/OrderCard";
import Loading from "../components/Loading";

const OrderContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  font-family: "Nunito Sans";
`;

const Orders = () => {
  const [data, setData] = useState();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const getData = () => {
    fetch(`http://localhost:8000/orders/${authCtx.userid}`, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    if (!authCtx.userid) navigate("/login");
    else getData();
  }, []);

  const renderOrders = () => {
    console.log(data);
    if (data.length === 0) {
      return <h1>No orders yet</h1>;
    } else {
      return data.map((order) => (
        <OrderCard
          items={order.items}
          total={order.total}
          date={order.createdAt}
        />
      ));
    }
  };

  if (!data) return <Loading />;
  return (
    <>
      <Navbar />
      <OrderContainer>{renderOrders()}</OrderContainer>
    </>
  );
};

export default Orders;
