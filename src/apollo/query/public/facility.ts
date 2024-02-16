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
