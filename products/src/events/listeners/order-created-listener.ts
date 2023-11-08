import { Listener, OrderCreatedEvent, Subjects } from "@specomm/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/Product";
import { NotFoundError } from "@specomm/common";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], message: Message) {
    const ticket = await Product.findById(data.ticket.id);
    if (!ticket) throw new NotFoundError();
    ticket.set({ orderId: data.id });

    await ticket.save();

    message.ack();
  }
}
