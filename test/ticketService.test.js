import assert from 'assert';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';
import TicketService from '../src/pairtest/TicketService.js';

let ticketService = new TicketService()
describe('Ticket Service: invalid account ID tests', function () {
	it('Account ID of string', function () {
		assert.throws(() => ticketService.purchaseTickets('string', []), {
			message: 'Account ID must be valid',
		})
	});
	it('Account ID of a string "2"', function () {
		assert.throws(() => ticketService.purchaseTickets('2', []), {
			message: 'Account ID must be valid',
		})
	});
	it('Account ID of 0', function () {
		assert.throws(() => ticketService.purchaseTickets(0, []), {
			message: 'Account ID must be valid',
		})
	});
	it('Account ID of 2.5', function () {
		assert.throws(() => ticketService.purchaseTickets(2.5, []), {
			message: 'Account ID must be valid',
		})
	});
});

describe('Ticket Service: invalid ticket request tests', function () {
	it('No ticket requests', function () {
		assert.throws(() => ticketService.purchaseTickets(1), {
			message: 'You must provide at least one ticket',
		})
	});
	it('Too many ticket requests', function () {
		assert.throws(() => ticketService.purchaseTickets(1,
			new TicketTypeRequest("ADULT", 10),
			new TicketTypeRequest("CHILD", 5),
			new TicketTypeRequest("INFANT", 6)), {
			message: 'You cannot purchase more than 20 tickets per transaction',
		})
		assert.throws(() => ticketService.purchaseTickets(1,
			new TicketTypeRequest("ADULT", 2),
			new TicketTypeRequest("CHILD", 5),
			new TicketTypeRequest("ADULT", 2),
			new TicketTypeRequest("INFANT", 6),
			new TicketTypeRequest("ADULT", 2),
			new TicketTypeRequest("CHILD", 2),
			new TicketTypeRequest("ADULT", 2)), {
			message: 'You cannot purchase more than 20 tickets per transaction',
		})
	});
});

describe('Ticket Service: valid account ID tests', function () {
	it('Account ID of 1', function () {
		assert.doesNotThrow(() => ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 10)))
	});
	it('Account ID of 999', function () {
		assert.doesNotThrow(() => ticketService.purchaseTickets(999, new TicketTypeRequest("ADULT", 10)))
	});
});

describe('Ticket Service: ticket type ratio tests', function () {
	it('Prevent child tickets from being sold without an adult ticket', function () {
		assert.throws(() => ticketService.purchaseTickets(1, new TicketTypeRequest("CHILD", 1)), {
			message: 'You must buy at least one adult ticket.'
		})
	});
	it('Prevent infant tickets from being sold without an adult ticket', function () {
		assert.throws(() => ticketService.purchaseTickets(1, new TicketTypeRequest("INFANT", 1)), {
			message: 'You must buy at least one adult ticket.'
		})
	});
	it('Require at least one adult per infant', function () {
		assert.throws(() => ticketService.purchaseTickets(999,
			new TicketTypeRequest("ADULT", 5),
			new TicketTypeRequest("INFANT", 10)), {
				message: 'You must buy one adult ticket per infant.'
			})
		assert.doesNotThrow(() => ticketService.purchaseTickets(999,
			new TicketTypeRequest("ADULT", 10),
			new TicketTypeRequest("INFANT", 10)))
	});
});