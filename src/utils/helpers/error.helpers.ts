import { ApolloError } from "@apollo/client";

export const getApolloErrorMessage = (error: ApolloError) => {
  let errorMessage = "Something went wrong";

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    errorMessage = error.graphQLErrors[0].message;
  } else if (error.networkError) {
    errorMessage = error.networkError.message;
  }

  return errorMessage;
};
