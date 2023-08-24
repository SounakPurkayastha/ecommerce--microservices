import styled from "styled-components";

const LoadingPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// @keyframes spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

const Spinner = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: transparent;
  border: 10px solid #eee;
  border-bottom: 10px solid #ccc;
  /* animation: spin 2s linear infinite; */
`;

const Loading = () => {
  return (
    <LoadingPage>
      <Spinner />
    </LoadingPage>
  );
};

export default Loading;
