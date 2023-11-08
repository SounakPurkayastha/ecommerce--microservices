import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderid]", `/orders/${order.id}`),
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button className="btn btn-primary" onClick={doRequest}>
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (ctx, client) => {
  const { ticketid } = ctx.query;
  const { data } = await client.get(`api/products/${ticketid}`);

  return { ticket: data };
};

export default TicketShow;
