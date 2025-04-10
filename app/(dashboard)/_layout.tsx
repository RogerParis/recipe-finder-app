import { useMemo } from 'react';
import { View } from 'react-native';

import { Stack } from 'expo-router';
import { router } from 'expo-router';

import { HeaderButton } from '@/components/common/header_button.component';

import { useMealStore } from '@/store/meals/useMealStore';
import { COLORS } from '@/theme/colors';

const ProfileButton = () => (
  <HeaderButton icon="person-outline" onPress={() => router.push('/(dashboard)/profile')} />
);

const FavoritesButton = () => (
  <HeaderButton icon="heart" onPress={() => router.push('/meal/favorites')} color="red" />
);

const FavoriteToggleButton = ({ mealId }: { mealId: string }) => {
  const { isMealFavorite, toggleFavoriteMeal } = useMealStore();
  const isFavorite = useMemo(() => isMealFavorite(mealId), [mealId, isMealFavorite]);

  return (
    <HeaderButton
      icon={'heart'}
      color={isFavorite ? COLORS.red : COLORS.white}
      onPress={() => toggleFavoriteMeal(mealId)}
    />
  );
};

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
        options={({ route }: { route: { params?: { id?: string } } }) => {
          const mealId = route.params?.id || '';
          return {
            title: 'Meal Details',
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {mealId ? <FavoriteToggleButton mealId={mealId} /> : null}
                <ProfileButton />
              </View>
            ),
          };
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
