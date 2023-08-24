import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  height: 500px;
  width: 400px;
  border-radius: 30px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 50%;
  object-fit: cover;
`;

const SuccessCard = () => {
  return (
    <Card>
      <Container>
        <Image src="\png-transparent-white-check-with-green-background-illustration-fingerprint-comcast-circle-symbol-technology-tick-miscellaneous-angle-logo-removebg-preview.png" />
        <h1>Success</h1>
        <Link to="/">Home</Link>
      </Container>
    </Card>
  );
};

export default SuccessCard;
