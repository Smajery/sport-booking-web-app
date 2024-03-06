import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
      id
      userId
      facility {
        name
      }
      facilityId
      status
      price
      bookingSlots {
        id
        timeSlot {
          id
          price
          startTime
        }
      }
    }
  }
`;
