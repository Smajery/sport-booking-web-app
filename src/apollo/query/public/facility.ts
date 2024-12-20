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
        images {
          image
          isMain
        }
        ratingCount
        avgRating
        currentUserIsFavorite
        isWorking
      }
      totalCount
      priceRange {
        max
        min
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
      location
      images {
        image
        isMain
      }
      ratingCount
      avgRating
      currentUserIsFavorite
      avgPrice
      isWorking
      owner {
        userOwner {
          phone
        }
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
