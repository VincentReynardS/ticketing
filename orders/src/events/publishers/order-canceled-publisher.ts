import { OrderCanceledEvent, Publisher, Subjects } from '@vrstickets/common';

export class OrderCanceledPublisher extends Publisher<OrderCanceledEvent> {
  readonly subject = Subjects.OrderCanceled;
}
