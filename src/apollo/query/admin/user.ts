import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query GetProfile {
    getProfile {
      id
      fullname
      email
      dateOfBirth
      avatar
      createdAt
      updatedAt
      activationLink
      isActivated
      userOwner {
        phone
        organizationName
      }
    }
  }
`;
