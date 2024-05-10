"use client";

import { ApolloLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { getCookie } from "@/utils/helpers/cookie.helpers";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from "@apollo/client/link/context";

const makeClient = () => {
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    fetchOptions: { cache: "no-store" },
  });

  const authLink = setContext((_, { headers, ...rest }) => {
    const token = getCookie("accessToken");

    if (rest.authRequired) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    }

    return { headers };
  });

  const link =
    typeof window === "undefined"
      ? ApolloLink.from([
          new SSRMultipartLink({ stripDefer: true }),
          authLink,
          httpLink,
        ])
      : ApolloLink.from([authLink, httpLink]);

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
          },
        },
      },
    }),
    link: link,
  });
};

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
