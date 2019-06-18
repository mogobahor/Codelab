import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { GraphQLError } from 'graphql';
import { Subject } from 'rxjs';
import { newStateLink } from 'src/state/apollo-link-state';

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || '',
    },
  });

  return forward!(operation);
});

export const errorSubject = new Subject<GraphQLError>();

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.map(graphQLError => {
        errorSubject.next(graphQLError);
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
    return forward(operation);
  },
);

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const link = ApolloLink.from([authLink, errorLink, httpLink]);

export const apolloConfig: ApolloClientOptions<any> = {
  link,
  cache: new InMemoryCache(),
  resolvers: newStateLink.resolvers,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
};
