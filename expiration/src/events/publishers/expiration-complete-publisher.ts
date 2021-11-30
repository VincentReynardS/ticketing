import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@vrstickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
