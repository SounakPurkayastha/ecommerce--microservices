import { Publisher, OrderCreatedEvent, Subjects } from "@specomm/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
