"use client";

import { ApolloLink, useMutation } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { getCookie, setCookie } from "@/utils/helpers/cookie.helpers";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN_MUTATION } from "@/apollo/mutations/auth";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { jwtDecode } from "jwt-decode";

const makeClient = () => {
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  });

  const authLink = setContext(async (_, { headers, ...rest }) => {
    let token = getCookie("accessToken");

    if (rest.authRequired && !token) {
      const refresh = getCookie("refreshToken");
      if (refresh) {
        try {
          token = await getAccessToken(refresh);
        } catch (e) {
          ErrorHandler.handle(e, {
            componentName: "ApolloProvider__authLink",
          });
        }
      }
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          if (err.extensions && err.extensions.code === "UNAUTHENTICATED") {
            const refresh = getCookie("refreshToken");
            if (refresh) {
              return getAccessToken(refresh)
                .then((newAccessToken) => {
                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `Bearer ${newAccessToken}`,
                    },
                  });

                  return forward(operation);
                })
                .catch((error) => {
                  ErrorHandler.handle(error, {
                    componentName: "ApolloProvider__errorLink",
                  });
                  throw error;
                });
            }
          }
        }
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    },
  );

  const link =
    typeof window === "undefined"
      ? ApolloLink.from([
          new SSRMultipartLink({ stripDefer: true }),
          authLink,
          errorLink,
          httpLink,
        ])
      : ApolloLink.from([authLink, errorLink, httpLink]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            facility: {
              merge(existing, incoming, { mergeObjects }) {
                return mergeObjects(existing, incoming);
              },
            },
            getProfile: {
              merge(existing, incoming, { mergeObjects }) {
                return mergeObjects(existing, incoming);
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
    },
    link: link,
  });
};

const getAccessToken = async (refresh: string) => {
  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);

  try {
    const { data } = await refreshToken({
      variables: {
        refresh,
      },
    });
    const accessToken = data.accessToken;
    const decodedAccessToken: { exp: number } = jwtDecode(accessToken);

    setCookie("accessToken", accessToken, decodedAccessToken.exp);
    return accessToken;
  } catch (e) {
    ErrorHandler.handle(e, {
      componentName: "ApolloProvider__getAccessToken",
    });
    throw e;
  }
};

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
