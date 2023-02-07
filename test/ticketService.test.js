import assert from 'assert';
import TicketService from '../src/pairtest/TicketService.js';

let ticketService = new TicketService()

describe('Ticket Service: Invalid Account ID tests', function () {
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

describe('Ticket Service: Valid Account ID tests', function () {
	it('Account ID of 1', function () {
		assert.doesNotThrow(() => ticketService.purchaseTickets(1, []))
	});
	it('Account ID of 999', function () {
		assert.doesNotThrow(() => ticketService.purchaseTickets(999, []))
	});
});