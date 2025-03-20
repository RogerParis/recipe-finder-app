import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});

export const COUNTRIES_QUERY = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`;
