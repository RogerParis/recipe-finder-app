// app/_layout.tsx
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import { Slot, useRouter, useSegments } from 'expo-router';

import '@/services/auth.service'; // 👈 ensures Firebase is ready
import { apolloClient } from '@/services/apollo.service';
import { AuthProvider, useAuth } from '@/store/auth.context';
import { COLORS } from '@/theme/colors';
import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react-native';

enableScreens();

Sentry.init({
  dsn: 'https://9c5dd1002679e15487595a57c4df6837@o4509005539901442.ingest.de.sentry.io/4509005540360272',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const RootLayout = Sentry.wrap(() => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <GestureHandlerRootView>
          <AppEntry />
        </GestureHandlerRootView>
      </AuthProvider>
    </ApolloProvider>
  );
});

export function AppEntry() {
  const { user, initializing } = useAuth();
  const [segment] = useSegments();
  const router = useRouter();

  const isInAuthGroup = segment?.startsWith('(auth)');

  useEffect(() => {
    if (!initializing) {
      if (!user && !isInAuthGroup) {
        router.replace('/(auth)');
      } else if (user && isInAuthGroup) {
        router.replace('/(dashboard)');
      }
    }
  }, [user, initializing, isInAuthGroup]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return <Slot />;
}

export default RootLayout;
