import { TicketCreatedPublisher } from '../../events/publishers/ticket-created-publisher';
import { Ticket } from '../ticket';

it('implements optimistic concurrentcy control', async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // Save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstTicket = await Ticket.findById(ticket.id);
  const secondTicket = await Ticket.findById(ticket.id);

  // make two separate changes to the tickets we fetched
  firstTicket!.set({ price: 10 });
  secondTicket!.set({ price: 15 });

  // save the first fetched ticket
  await firstTicket!.save();

  // save the second fetched ticket and expect an error
  await expect(secondTicket!.save()).rejects.toThrow();
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
