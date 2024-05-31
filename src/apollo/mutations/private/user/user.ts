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

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
      email
    }
  }
`;

export const RESTORE_PASSWORD_MUTATION = gql`
  mutation RestorePassword($email: String!) {
    restorePassword(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;
