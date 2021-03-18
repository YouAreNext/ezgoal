import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  concat
} from "@apollo/client/core";

const getToken = () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  return token ? `Bearer ${token}` : "";
};

// interface Headers {
//   [key: string]: any
// }

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  const headers: any = {};
  if (getToken()) headers.Authorization = getToken();
  operation.setContext({
    headers
  });

  return forward(operation);
});

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_API || "http://localhost:8080/v1/graphql"
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: concat(middlewareLink, httpLink),
  cache
});

export default apolloClient;
