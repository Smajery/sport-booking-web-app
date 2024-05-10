import { gql } from "@apollo/client";

export const BECAME_OWNER_MUTATION = gql`
  mutation addOwnerInfo($ownerInfo: AddOwnerInfoInput!) {
    addOwnerInfo(ownerInfo: $ownerInfo) {
      id
      userOwner {
        userId
        phone
        organizationName
      }
    }
  }
`;

export const ADD_TO_FAVORITE_MUTATION = gql`
  mutation AddFavorite($facilityId: Int!) {
    addFavorite(facilityId: $facilityId)
  }
`;

export const REMOVE_FROM_FAVORITE_MUTATION = gql`
  mutation RemoveFavorite($facilityId: Int!) {
    removeFavorite(facilityId: $facilityId)
  }
`;
