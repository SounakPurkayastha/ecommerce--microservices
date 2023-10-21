import { Message } from "node-nats-streaming";
import Listener from "./Listener";
import { TicketCreatedEvent } from "./TicketCreatedEvent";
import { Subjects } from "./subjects";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data", data);

    msg.ack();
  }
}

export default TicketCreatedListener;
