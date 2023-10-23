import { TicketUpdatedEvent, Publisher, Subjects } from "@specomm/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
