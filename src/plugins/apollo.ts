import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { useErrorsStore } from '../stores/Error';
import { setContext } from '@apollo/client/link/context';
import { createApolloProvider } from '@vue/apollo-option'

const httpLink = createHttpLink({
  uri: '/graphql/glossary/',
  credentials: 'include',
});

const errorHandler = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    useErrorsStore().$patch({
      message: graphQLErrors[0].message,
      category: graphQLErrors[0].extensions.category,
      fields: graphQLErrors[0].extensions.validation ?? { input: {} },
    });
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token'),
    },
  };
});

const cache = new InMemoryCache({canonizeResults: false});

export const apolloClient = new ApolloClient({
  link: authLink.concat(errorHandler.concat(httpLink)),
  cache,
  connectToDevTools: true,
});


export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})
