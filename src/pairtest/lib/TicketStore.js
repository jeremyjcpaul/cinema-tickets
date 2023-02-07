import InvalidPurchaseException from './InvalidPurchaseException.js';

/**
 * Immutable Object.
 */
export default class TicketStore {

  #adults
  #children
  #infants
  #totalTickets = 0
  #validated = false

  constructor() {
    this.#adults = 0
    this.#children = 0
    this.#infants = 0
  }

  /**
   * Adds the given number of tickets of the given type to the store.
   *
   * @param {string} type The type of tickets to add to the store.
   * @param {number} noOfTickets The number of tickets to add to the store.
   * @throws InvalidPurchaseException|TypeError
   */
  addTickets(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new TypeError(`type must be ${this.#Type.slice(0, -1).join(', ')}, or ${this.#Type.slice(-1)}`);
    }

    if (!Number.isInteger(noOfTickets) || noOfTickets <= 0) {
      throw new TypeError('noOfTickets must be an integer greater than 0')
    }

    if (this.#totalTickets + noOfTickets > 20) {
      throw new InvalidPurchaseException('You cannot purchase more than 20 tickets per transaction')
    }
    this.#totalTickets += noOfTickets

    switch (type) {
      case this.Adult:
        this.#adults += noOfTickets
        break;

      case this.Child:
        this.#children += noOfTickets
        break;

      case this.Infant:
        this.#infants += noOfTickets
        break;
    }
  }

  /**
   * Gets the total number of seat reservations, for the current TicketStore state.
   *
   * @returns {number}
   */
  getNoSeatReservations() {
    if (this.#validated) this.validate()
    return 0
  }

  /**
   * Gets the total cost of tickets, for the current TicketStore state.
   *
   * @returns {number}
   */
  getTotalCost() {
    if (this.#validated) this.validate()
    return 0
  }

  /**
   * Validates the current TicketStore state.
   *
   * @throws InvalidPurchaseException
   */
  validate() {
    this.#validated = true

  }

  #Adult = 'ADULT'
  #Child = 'CHILD'
  #Infant = 'INFANT'
  #Type = ['ADULT', 'CHILD', 'INFANT'];

}
