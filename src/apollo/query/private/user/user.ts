import { gql } from "@apollo/client";

export const GET_USER_FAVORITES_QUERY = gql`
  query GetUserFavorites($paginationArgs: PaginationArgs) {
    getUserFavorites(paginationArgs: $paginationArgs) {
      totalCount
      facilities {
        id
        name
        avgPrice
        district {
          id
          name
          city {
            name
          }
        }
        address
        sportType
        coveringType
        facilityType
        description
        images {
          image
        }
        ratingCount
        avgRating
        currentUserIsFavorite
        isWorking
      }
    }
  }
`;
