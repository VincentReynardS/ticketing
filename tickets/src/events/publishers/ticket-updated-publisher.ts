import { Publisher, Subjects, TicketUpdatedEvent } from '@vrstickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
