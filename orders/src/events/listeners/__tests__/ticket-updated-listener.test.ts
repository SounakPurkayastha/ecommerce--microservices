import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/Ticket";
import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@specomm/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "blah",
    price: 20,
  });
  await ticket.save();

  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "new blah",
    price: 90,
    userId: "sdasdasd",
  };

  //@ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, data, ticket, message };
};

it("finds updates and saves ticket", async () => {
  const { listener, data, ticket, message } = await setup();
  await listener.onMessage(data, message);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acknowledges the message", async () => {
  const { listener, data, ticket, message } = await setup();
  await listener.onMessage(data, message);
  expect(message.ack).toHaveBeenCalled();
});
