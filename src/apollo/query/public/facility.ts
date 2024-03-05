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
        district
        address
        sportType
        coveringType
        facilityType
        location
        description
        minBookingTime
        images {
          image
          isMain
        }
        ratingCount
        avgRating
        _count {
          ratings
        }
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
      district
      address
      sportType
      coveringType
      facilityType
      description
      location
      minBookingTime
      images {
        image
        isMain
      }
      ratingCount
      avgRating
      _count {
        ratings
      }
      currentUserRate {
        id
        value
      }
    }
  }
`;

export const GET_FACILITY_SCHEDULE = gql`
  query FindFacilitySchedule($id: Int!) {
    facility(id: $id) {
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
