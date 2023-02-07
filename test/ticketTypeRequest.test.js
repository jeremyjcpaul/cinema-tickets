import assert from 'assert';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

describe('Ticket Type Request tests', function () {
	it('Check objects are immutable', function () {
		let ticketTypeRequest = new TicketTypeRequest("ADULT", 2)
		assert.ok(Object.isExtensible(ticketTypeRequest), "Class is extensible!")
	});

	it('Check error with invalid ticket type', function () {
		assert.throws(() => new TicketTypeRequest("ALIEN", 2), {
			message: `type must be ADULT, CHILD, or INFANT`,
		})
	});

	it('Check error with invalid ticket number', function () {
		assert.throws(() => new TicketTypeRequest("ADULT", "0"), {
			message: `noOfTickets must be an integer`,
		})
		assert.throws(() => new TicketTypeRequest("ADULT", 2.5), {
			message: `noOfTickets must be an integer`,
		})
	});
});