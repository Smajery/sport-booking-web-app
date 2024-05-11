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

export const GET_USER_AVATAR_QUERY = gql`
  query GetProfile {
    getProfile {
      fullname
      avatar
    }
  }
`;

export const GET_USER_ID_QUERY = gql`
  query GetProfile {
    getProfile {
      userOwner {
        id
      }
    }
  }
`;
