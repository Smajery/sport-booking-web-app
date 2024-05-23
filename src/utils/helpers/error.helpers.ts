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

export const getErrorMessage = (error: Error) => {
  let errorMessage = "Something went wrong";
  if ("response" in error && error.response) {
    if (error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.response.data.error) {
      errorMessage = error.response.data.error;
    }
  } else if ("message" in error) {
    errorMessage = error.message;
  }
  return errorMessage;
};
