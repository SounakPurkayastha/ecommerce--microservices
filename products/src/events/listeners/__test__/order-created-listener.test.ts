import { Listener, OrderStatus } from "@specomm/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import { Product } from "../../../models/Product";
import { OrderCreatedEvent } from "@specomm/common";
import mongoose, { set } from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = Product.build({
    title: "blah",
    price: 20,
    userId: "asdasd",
  });

  await ticket.save();

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asdasdas",
    expiresAt: "asdasdasd",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  //@ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, message };
};

it("sets user id of ticket", async () => {
  const { listener, ticket, data, message } = await setup();
  await listener.onMessage(data, message);
  const updatedTicket = await Product.findById(ticket.id);
  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { listener, ticket, data, message } = await setup();
  await listener.onMessage(data, message);
  message.ack();

  expect(message.ack).toHaveBeenCalled();
});
