# Cinema Tickets - JavaScript Assessment

To run this repo:

- run `npm install` to install
- run `npm test` to run the tests

---

## Tasks

[x] Test to ensure that TicketTypeRequest is immutable
[x] Prevent requests where the account id is not >= 0
[] Calculate ticket price based on the given request object (Adult: £20, Child: £10, Infant: £0)
[] Make a payment request to the `TicketPaymentService` when a request has been successfully validated.
[] Calculate the number of reservations (seats) based on the given request object
[] Make a payment request to the `SeatReservationService` when a request has been successfully validated.
[x] Require at least one adult ticket per request
[x] Only allow up to 20 tickets per request
[] Prevent child and infant tickets from being sold without an adult ticket
[] Prevent infant tickets from being allocated a seat (i.e. 1 Adult and 1 Infant is a single reservation)
