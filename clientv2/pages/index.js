import Link from "next/link";

const Index = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => (
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>
        <Link href="/tickets/[ticketid]" as={`/tickets/${ticket.id}`}>
          View
        </Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// on the server
Index.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/products");
  return { tickets: data };
};

export default Index;
