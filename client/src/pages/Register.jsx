import RegisterForm from "../components/RegisterForm";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const RegisterPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Register = () => {
  const location = useLocation();

  return (
    <RegisterPage>
      <RegisterForm context={location.state.context} />
    </RegisterPage>
  );
};

export default Register;
