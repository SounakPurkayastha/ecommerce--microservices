import OrderForm from "../components/OrderForm";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const PlaceOrder = () => {
  const location = useLocation();

  const context = location.state ? location.state.context : null;

  return (
    <>
      <Navbar />
      <OrderForm context={context} />
    </>
  );
};

export default PlaceOrder;
