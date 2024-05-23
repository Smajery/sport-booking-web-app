import { gql } from "@apollo/client";

export const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
      id
      price
    }
  }
`;
