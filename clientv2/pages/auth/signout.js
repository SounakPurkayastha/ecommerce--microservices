import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";
import Router from "next/router";

export default () => {
  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div> Signing you out </div>;
};
