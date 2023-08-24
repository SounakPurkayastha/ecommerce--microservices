import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart-context";
import { AuthContext } from "../contexts/auth-context";
import FormInput from "./FormInput";

const FormContainer = styled.div`
  font-family: "Nunito Sans";
  width: 50%;
  margin: 20px auto;
`;

const FormButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #1971c2;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #1864ab;
  }
`;

const OrderForm = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pincode: "",
    houseNumber: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      errorMessage: "Username cannot be empty or have special characters",
      label: "Name",
      required: true,
      pattern: "^[ ]*[a-zA-Z0-9][a-zA-Z0-9 ]*$",
    },
    {
      id: 2,
      name: "mobileNumber",
      type: "text",
      pattern: "^[0-9]{10}$",
      errorMessage: "Enter valid mobile number",
      label: "Mobile Number",
      required: true,
    },
    {
      id: 3,
      name: "pincode",
      type: "text",
      pattern: "^[0-9]{6}$",
      errorMessage: "Enter valid pincode",
      label: "Pincode",
      required: true,
    },
    {
      id: 4,
      name: "houseNumber",
      type: "text",
      errorMessage: "Enter valid house number",
      label: "House Number",
      required: true,
      pattern: "^[ ]*[a-zA-Z0-9][a-zA-Z0-9 ]*$",
    },
    {
      id: 5,
      name: "area",
      type: "text",
      errorMessage: "Enter valid area",
      label: "Area",
      required: true,
      pattern: "^[ ]*[a-zA-Z0-9][a-zA-Z0-9 ]*$",
    },
    {
      id: 6,
      name: "landmark",
      type: "text",
      errorMessage: "Enter valid landmark",
      label: "Landmark(Optional)",
      pattern: "^[ ]*[a-zA-Z0-9][a-zA-Z0-9 ]*$",
    },
    {
      id: 7,
      name: "city",
      type: "text",
      errorMessage: "Enter valid city",
      label: "City",
      required: true,
      pattern: "^[ ]*[a-zA-Z0-9][a-zA-Z0-9 ]*$",
    },
    {
      id: 8,
      name: "state",
      type: "text",
      errorMessage: "Enter valid state",
      label: "State",
      required: true,
      pattern: "^[ ]*[a-zA-Z0-9][a-zA-Z0-9 ]*$",
    },
  ];

  const formChangeHandler = (e) => {
    setFormData((formData) => {
      return { ...formData, [e.target.name]: e.target.value };
    });
  };

  const getOrder = () => {
    if (props.context === "buy now") {
      const order = JSON.parse(localStorage.getItem("order"));
      return {
        userid: authCtx.userid,
        items: [{ item: order["item"], count: order["count"] }],
        total: order["total"],
        ...formData,
      };
    }
    return {
      userid: authCtx.userid,
      items: cartCtx.items.map((item) => ({
        item: item.product._id,
        count: item.count,
      })),
      total: cartCtx.total,
      ...formData,
    };
  };

  const pay = (order) => {
    if (props.context === "cart") cartCtx.onCartClear();
    fetch("http://localhost:8000/payments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then(({ url }) => {
        window.location = url;
      });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const order = getOrder();
    localStorage.setItem("order", JSON.stringify(order));
    pay(order);
  };

  return (
    <FormContainer>
      <form onSubmit={formSubmitHandler}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={formData[input.name]}
            onChange={formChangeHandler}
          />
        ))}
        <FormButton type="submit">Proceed To Payment</FormButton>
      </form>
    </FormContainer>
  );
};

export default OrderForm;
