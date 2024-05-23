import { gql } from "@apollo/client";

export const CREATE_RATING_MUTATION = gql`
  mutation CreateRating($createRatingInput: CreateRatingInput!) {
    createRating(createRatingInput: $createRatingInput) {
      value
      facilityId
    }
  }
`;

export const UPDATE_RATING_MUTATION = gql`
  mutation UpdateRating($updateRatingInput: UpdateRatingInput!) {
    updateRating(updateRatingInput: $updateRatingInput) {
      id
      value
    }
  }
`;
