import assert from 'assert';
import TicketStore from '../src/pairtest/lib/TicketStore.js';

var ticketStore = new TicketStore()
beforeEach(() => {
  ticketStore = new TicketStore()
});

describe('Ticket Store: seat allocations and total cost tests', function () {
	it('1 Adult = £20 and 1 seat', function () {
		ticketStore.addTickets("ADULT", 1)
		assert.equal(ticketStore.getNoSeatReservations(), 1)
		assert.equal(ticketStore.getTotalCost(), 20)
	});
	it('1 Adult, 1 Infant = £20 and 1 seat', function () {
		ticketStore.addTickets("ADULT", 1)
		ticketStore.addTickets("INFANT", 1)

		assert.equal(ticketStore.getNoSeatReservations(), 1)
		assert.equal(ticketStore.getTotalCost(), 20)
	});
	it('1 Adult, 1 Infant, 1 Child = £30 and 2 seats', function () {
		ticketStore.addTickets("ADULT", 1)
		ticketStore.addTickets("INFANT", 1)
		ticketStore.addTickets("CHILD", 1)

		assert.equal(ticketStore.getNoSeatReservations(), 2)
		assert.equal(ticketStore.getTotalCost(), 30)
	});
	it('10 Adults, 5 Infants, 5 Children = £250 and 15 seats', function () {
		ticketStore.addTickets("ADULT", 10)
		ticketStore.addTickets("INFANT", 5)
		ticketStore.addTickets("CHILD", 5)

		assert.equal(ticketStore.getNoSeatReservations(), 15)
		assert.equal(ticketStore.getTotalCost(), 250)
	});
	it('10 Adults, 10 Children = £300 and 20 seats', function () {
		ticketStore.addTickets("ADULT", 10)
		ticketStore.addTickets("CHILD", 10)

		assert.equal(ticketStore.getNoSeatReservations(), 20)
		assert.equal(ticketStore.getTotalCost(), 300)
	});
});