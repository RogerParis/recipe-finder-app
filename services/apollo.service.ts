import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const COUNTRIES_QUERY = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`;

export const apolloClient = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});
