import { OrderCreatedEvent, Publisher, Subjects } from '@vrstickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
