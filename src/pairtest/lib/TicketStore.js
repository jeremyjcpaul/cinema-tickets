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
    if (!this.#Type.includes(type.toUpperCase())) {
      throw new TypeError(`type must be ${this.#Type.slice(0, -1).join(', ')}, or ${this.#Type.slice(-1)}`);
    }
    type = type.toUpperCase()

    if (!Number.isInteger(noOfTickets) || noOfTickets <= 0) {
      throw new TypeError('You must provide at least one ticket')
    }

    if (this.#totalTickets + noOfTickets > 20) {
      throw new InvalidPurchaseException('You cannot purchase more than 20 tickets per transaction')
    }
    this.#totalTickets += noOfTickets

    switch (type) {
      case "ADULT":
        this.#adults += noOfTickets
        break;

      case "CHILD":
        this.#children += noOfTickets
        break;

      case "INFANT":
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
    return this.#adults + this.#children
  }

  /**
   * Gets the total cost of tickets, for the current TicketStore state.
   *
   * @returns {number}
   */
  getTotalCost() {
    if (this.#validated) this.validate()
    return (this.#adults * 20) + (this.#children * 10)
  }

  /**
   * Validates the current TicketStore state.
   *
   * @throws InvalidPurchaseException
   */
  validate() {
    this.#validated = true

    // Prevent child and infant tickets from being sold without an adult ticket
    if (this.#adults == 0 && (this.#children > 0 || this.#infants > 0)) {
      throw new InvalidPurchaseException('You must buy at least one adult ticket.')
    }

    // Require at least one adult per infant
    if (this.#adults < this.#infants) {
      throw new InvalidPurchaseException('You must buy one adult ticket per infant.')
    }
  }

  #Type = ['ADULT', 'CHILD', 'INFANT'];

}
