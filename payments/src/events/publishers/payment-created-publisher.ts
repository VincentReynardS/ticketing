import { PaymentCreatedEvent, Publisher, Subjects } from '@vrstickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
