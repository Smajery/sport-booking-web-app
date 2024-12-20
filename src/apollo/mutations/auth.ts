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
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refresh: String) {
    accessToken(refresh: $refresh)
  }
`;

export const LOGOUT_USER_MUTATION = gql`
  mutation logout {
    logout
  }
`;

export const GOOGLE_AUTH_MUTATION = gql`
  mutation GoogleAuth($token: String!) {
    googleAuth(token: $token) {
      accessToken
      refreshToken
    }
  }
`;
