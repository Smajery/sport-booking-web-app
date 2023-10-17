import { gql } from "@apollo/client";

export const REGISTER_USER_MUTATION = gql`
  mutation register($registerInput: RegisterDto!) {
    register(registerInput: $registerInput) {
      user {
        id
        email
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation login($loginInput: LoginDto!) {
    login(loginInput: $loginInput) {
      user {
        id
        email
        roles {
          value
        }
      }
    }
  }
`;
