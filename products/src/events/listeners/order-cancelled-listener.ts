import {
  Listener,
  NotFoundError,
  OrderCancelledEvent,
  Subjects,
} from "@specomm/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/Product";
import { TicketUpdatedPublisher } from "../publishers/TicketUpdatedPublisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], message: Message) {
    const ticket = await Product.findById(data.ticket.id);
    if (!ticket) throw new NotFoundError();
    ticket.set({ orderId: undefined });
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      version: ticket.version,
      title: ticket.title,
    });

    message.ack();
  }
}
