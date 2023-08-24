import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { useLocation } from "react-router-dom";

const LoginPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const location = useLocation();

  const context = location.state ? location.state.context : null;

  return (
    <>
      <LoginPage>
        <LoginForm context={context} />
      </LoginPage>
    </>
  );
};

export default Login;
