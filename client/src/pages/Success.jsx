import { CartContext } from "../contexts/cart-context";
import { AuthContext } from "../contexts/auth-context";
import { useContext, useState, useEffect } from "react";
import Loading from "../components/Loading";
import SuccessCard from "../components/SuccessCard";
import styled from "styled-components";

const SuccessPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nunito Sans";
`;

const Success = () => {
  const [data, setData] = useState();
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const getData = () => {
    fetch("http://localhost:8000/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: localStorage.getItem("order"),
    })
      .then((res) => res.json())
      .then((data) => {
        if (localStorage.getItem("clearCart") === "true") {
          localStorage.removeItem("order");
          localStorage.removeItem(`items${authCtx.userid}`);
          localStorage.removeItem(`itemsCount${authCtx.userid}`);
          localStorage.removeItem(`items${authCtx.userid}`);
          localStorage.removeItem("clearCart");
          cartCtx.onReset();
        }
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) return <Loading />;
  return (
    <SuccessPage>
      <SuccessCard />
    </SuccessPage>
  );
};

export default Success;
