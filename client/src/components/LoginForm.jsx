import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "./FormInput";

const LoginFormContainer = styled.div`
  /* height: 330px; */
  width: 400px;
  border-radius: 30px;
  background-color: #eee;
  padding: 20px 20px 40px 20px;
  box-sizing: border-box;
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

const ErrorMessage = styled.div`
  height: 50px;
  margin: 20px 0;
  width: 100%;
  border-radius: 10px;
  background-color: #e03131;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nunito Sans";
  color: white;
`;

const StyledLink = styled.p`
  text-decoration: none;
  font-family: "Nunito Sans";
  cursor: pointer;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

const LoginForm = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      errorMessage: "Enter valid email",
      label: "Email",
      required: true,
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      errorMessage: "Enter password",
      label: "Password",
      required: true,
      placeholder: "Password",
    },
  ];

  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          authCtx.login(data.token, data.userid, data.username);
          if (props.context === "buy now")
            navigate("/placeOrder", { state: { context: "buy now" } });
          else if (props.context === "cart")
            navigate("/placeOrder", { state: { context: "cart" } });
          else navigate(-1);
        } else {
          setErrorMessage(data.error.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const showErrorMessage = () => {
    if (errorMessage) return <ErrorMessage>{errorMessage}</ErrorMessage>;
  };

  const formChangeHandler = (e) => {
    setFormData((formData) => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <LoginFormContainer>
        <form onSubmit={formSubmitHandler}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={formData[input.name]}
              onChange={formChangeHandler}
            />
          ))}
          <FormButton type="submit">SUBMIT</FormButton>
          <StyledLink
            onClick={() =>
              navigate("/register", {
                state: { context: props.context },
              })
            }
          >
            Don't have an account?
          </StyledLink>
          {showErrorMessage()}
        </form>
      </LoginFormContainer>
    </>
  );
};

export default LoginForm;
