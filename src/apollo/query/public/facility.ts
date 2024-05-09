import { gql } from "@apollo/client";

export const GET_ALL_FACILITIES_QUERY = gql`
  query FindAllFacilities(
    $facilitiesFilterInput: FacilitiesFilterInput
    $paginationArgs: PaginationArgs
  ) {
    findAll(
      facilitiesFilterInput: $facilitiesFilterInput
      paginationArgs: $paginationArgs
    ) {
      facilities {
        id
        name
        district {
          city {
            districts {
              id
              name
            }
            id
            name
          }
          id
          name
        }
        address
        sportType
        coveringType
        facilityType
        location
        description
        avgPrice
        currentUserIsFavorite
        minBookingTime
        images {
          image
          isMain
        }
        ratingCount
        avgRating
      }
      totalCount
    }
  }
`;

export const GET_ONE_FACILITY_QUERY = gql`
  query FindOneFacility($id: Int!) {
    facility(id: $id) {
      id
      name
      district {
        city {
          districts {
            id
            name
          }
          id
          name
        }
        id
        name
      }
      address
      sportType
      coveringType
      facilityType
      description
      location
      images {
        image
        isMain
      }
      ratingCount
      avgRating
      currentUserRate {
        id
        value
      }
    }
  }
`;

export const GET_FACILITY_SCHEDULE_QUERY = gql`
  query FindFacilitySchedule($id: Int!) {
    facility(id: $id) {
      minBookingTime
      timeSlots {
        id
        dayOfWeek
        startTime
        endTime
        price
        status
      }
    }
  }
`;
