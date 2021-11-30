import { Publisher, Subjects, TicketCreatedEvent } from '@vrstickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
