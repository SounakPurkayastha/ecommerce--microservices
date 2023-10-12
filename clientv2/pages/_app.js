import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/buildClient";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <h1>{currentUser.email}</h1>
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  console.log(pageProps);
  return {
    pageProps,
    currentUser: data.currentUser,
  };
};

export default AppComponent;
