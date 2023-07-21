import fetch from 'cross-fetch';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { useErrorsStore } from '../stores/Error'
import { setContext } from '@apollo/client/link/context'
import { createApolloProvider } from '@vue/apollo-option'
import { ElNotification } from 'element-plus'

const httpLink = createHttpLink({
  uri: '/graphql/glossary/',
  credentials: 'include',
  fetch,
})

const errorHandler = onError(({ graphQLErrors }) => {
  if (graphQLErrors != null) {
    useErrorsStore().$patch({
      message: graphQLErrors[0].message,
      category: graphQLErrors[0].extensions?.category,
      fields: graphQLErrors[0].extensions?.validation ?? { input: {} }
    })

    void ElNotification({
      title: 'Error',
      message: graphQLErrors[0].message,
      type: 'error',
    })
  }
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token')
    }
  }
})

const cache = new InMemoryCache({ canonizeResults: false })

export const apolloClient = new ApolloClient({
  link: authLink.concat(errorHandler.concat(httpLink)),
  cache,
  connectToDevTools: true
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
})
