import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

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
    this._validateAccountId(accountId)
  }
}
