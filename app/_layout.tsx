import { Stack } from 'expo-router';

import { apolloClient } from '@/services/apollo.service';
import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://9c5dd1002679e15487595a57c4df6837@o4509005539901442.ingest.de.sentry.io/4509005540360272',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Meal of the Day',
            headerStyle: {
              backgroundColor: '#1a237e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="meal/[id]"
          options={{
            title: 'Meal Details',
            headerStyle: {
              backgroundColor: '#1a237e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="countries"
          options={{
            title: 'Select a Country',
            headerStyle: {
              backgroundColor: '#1a237e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack>
    </ApolloProvider>
  );
});
