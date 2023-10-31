import { Publisher, OrderCancelledEvent, Subjects } from "@specomm/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
