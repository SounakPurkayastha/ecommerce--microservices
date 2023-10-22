import { TicketCreatedEvent, Publisher, Subjects } from "@specomm/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
