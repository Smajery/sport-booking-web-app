import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateProfile($profileInput: UpdateUserDto, $avatar: Upload) {
    updateProfile(profileInput: $profileInput, avatar: $avatar) {
      fullname
      dateOfBirth
      avatar
    }
  }
`;
