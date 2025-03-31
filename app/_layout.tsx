// app/_layout.tsx
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Redirect, Slot, useSegments } from 'expo-router';

import '@/services/auth.service'; // 👈 ensures Firebase is ready
import { apolloClient } from '@/services/apollo.service';
import { AuthContext, AuthProvider } from '@/store/auth.context';
import { COLORS } from '@/theme/colors';
import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://9c5dd1002679e15487595a57c4df6837@o4509005539901442.ingest.de.sentry.io/4509005540360272',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const RootLayout = Sentry.wrap(() => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <AppEntry />
      </AuthProvider>
    </ApolloProvider>
  );
});

export function AppEntry() {
  const { user, initializing } = useContext(AuthContext);
  const [segment] = useSegments();
  const isInAuthGroup = segment === '(auth)';

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!user && !isInAuthGroup) {
    return <Redirect href="/(auth)" />;
  }

  if (user && isInAuthGroup) {
    return <Redirect href="/(dashboard)" />;
  }

  return <Slot />;
}

export default RootLayout;
