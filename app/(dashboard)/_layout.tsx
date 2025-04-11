import { View } from 'react-native';

import { Stack } from 'expo-router';
import { router } from 'expo-router';

import { HeaderButton } from '@/components/header_button.component';

import { COLORS } from '@/theme/colors';

const ProfileButton = () => (
  <HeaderButton icon="person-outline" onPress={() => router.push('/(dashboard)/profile')} />
);

const FavoritesButton = () => (
  <HeaderButton icon="heart" onPress={() => router.push('/meal/favorites')} color="red" />
);

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleAlign: 'center',
        headerRight: () => <ProfileButton />,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Choose a Feature',
        }}
      />
      <Stack.Screen
        name="meal/index"
        options={{
          title: 'Meal of the Day',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FavoritesButton />
              <ProfileButton />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="meal/[id]"
        options={{
          title: 'Meal Details',
        }}
      />
      <Stack.Screen
        name="countries"
        options={{
          title: 'Select a Country',
        }}
      />
      <Stack.Screen
        name="meal/favorites"
        options={{
          title: 'Your Favorites',
        }}
      />
      <Stack.Screen name="profile" options={{ title: 'Your Profile', headerRight: () => null }} />
    </Stack>
  );
}
