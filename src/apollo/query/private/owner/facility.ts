import { gql } from "@apollo/client";

export const GET_ALL_OWNER_FACILITIES_QUERY = gql`
  query findOwnerFacilities($paginationArgs: PaginationArgs) {
    findOwnerFacilities(paginationArgs: $paginationArgs) {
      totalCount
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
        isWorking
      }
    }
  }
`;

export const GET_ONE_FACILITY_QUERY = gql`
  query FindOneFacility($id: Int!) {
    facility(id: $id) {
      id
      name
      district {
        id
        name
      }
      address
      sportType
      coveringType
      facilityType
      description
      minBookingTime
      inventoryName
      inventoryPrice
      location
      images {
        image
        isMain
      }
      ratingCount
      avgRating
      avgPrice
      isWorking
    }
  }
`;

export const GET_FACILITY_SCHEDULE_QUERY = gql`
  query FindFacilitySchedule($id: Int!) {
    facility(id: $id) {
      id
      minBookingTime
      schedule {
        date
        dayOfWeek
        timeSlots {
          id
          startTime
          endTime
          price
          status
        }
      }
    }
  }
`;
