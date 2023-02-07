import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketTypeRequest from './lib/TicketTypeRequest.js';
import TicketStore from './lib/TicketStore.js';

import SeatReservationService from './../thirdparty/seatbooking/SeatReservationService.js';
import TicketPaymentService from './../thirdparty/paymentgateway/TicketPaymentService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #ticketStore = new TicketStore
  #seatReservationService = new SeatReservationService()
  #ticketPaymentService = new TicketPaymentService()

  /**
   * Appends the given tickets into the TicketStore.
   *
   * @param {...TicketTypeRequest} ticketTypeRequests The tickets to add to the store.
   * @throws InvalidPurchaseException|TypeError
   */
  _populateTicketStore(ticketTypeRequests) {
    // check we have at least one ticket
    if (ticketTypeRequests.length === 0 || ticketTypeRequests.length <= 0) {
      throw new InvalidPurchaseException('You must provide at least one ticket')
    }

    // empty the store
    this.#ticketStore = new TicketStore

    for (const ticketTypeRequest of ticketTypeRequests) {
      // check this is actually a TicketTypeRequest
      if (typeof ticketTypeRequest.getTicketType !== 'function'
        || typeof ticketTypeRequest.getNoOfTickets !== 'function') {
          throw new TypeError('Invalid ticket type request')
        }

      // put the tickets onto the store
      this.#ticketStore.addTickets(ticketTypeRequest.getTicketType(), ticketTypeRequest.getNoOfTickets())
    }
  }

  /**
   * Checks that the given account ID is an integer of a value greater than 0.
   *
   * @param {Object} accountId The ID for the account purchasing the tickets.
   * @throws TypeError
   */
  _validateAccountId(accountId) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new TypeError('Account ID must be valid')
    }
  }

  /**
   * Attempts to purchase the given tickets, for the account with the given ID.
   *
   * @param {Object} accountId The ID for the account purchasing the tickets.
   * @param {...TicketTypeRequest} ticketTypeRequests The ticket purchase request.
   * @throws InvalidPurchaseException
   */
  purchaseTickets(accountId, ...ticketTypeRequests) {
    // check thsat the account ID is an integer > 0
    this._validateAccountId(accountId)

    // put the given tickets into a ticket store
    this._populateTicketStore(ticketTypeRequests)

    // validate the ticket store as it is currently - any issues and an exception is thrown
    this.#ticketStore.validate();

    // make the seat reservations
    this.#seatReservationService.reserveSeat(accountId, this.#ticketStore.getNoSeatReservations())

    // make the ticket payment
    this.#ticketPaymentService.makePayment(accountId, this.#ticketStore.getTotalCost())
  }
}
