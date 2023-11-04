import buildClient from "../api/buildClient";

const Index = ({ currentUser }) => {
  return currentUser ? (
    <h1>You is signed in</h1>
  ) : (
    <h1>You is not signed in</h1>
  );
};

// on the server
Index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default Index;
