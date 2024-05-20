import { gql } from "@apollo/client";

export const GET_USER_BOOKINGS_QUERY = gql`
  query FindAllBookings($paginationArgs: PaginationArgs) {
    findAllBookings(paginationArgs: $paginationArgs) {
      totalCount
      bookings {
        id
        startTime
        endTime
        status
        facility {
          id
          name
          sportType
          coveringType
          facilityType
          images {
            image
          }
        }
      }
    }
  }
`;
