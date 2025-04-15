import { View } from 'react-native';

import { Stack } from 'expo-router';
import { router } from 'expo-router';

import { HeaderButton } from '@/components/common/header_button.component';

import { Meal } from '@/store/meals/types';
import { useMealStore } from '@/store/meals/useMealStore';
import { COLORS } from '@/theme/colors';

const ProfileButton = () => (
  <HeaderButton icon="person-outline" onPress={() => router.push('/(dashboard)/profile')} />
);

const FavoritesButton = () => (
  <HeaderButton icon="heart" onPress={() => router.push('/meal/favorites')} color="red" />
);

const FavoriteToggleButton = ({ meal }: { meal: Meal }) => {
  const { isMealFavorite, toggleFavoriteMeal } = useMealStore();
  const isFavorite = () => isMealFavorite(meal.idMeal);

  return (
    <HeaderButton
      icon={'heart'}
      color={isFavorite() ? COLORS.red : COLORS.white}
      onPress={() => toggleFavoriteMeal(meal!)}
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
        options={({ route }: { route: { params?: { meal?: string } } }) => {
          const meal = route.params?.meal ? (JSON.parse(route.params.meal) as Meal) : undefined;
          return {
            title: 'Meal Details',
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {meal ? <FavoriteToggleButton meal={meal} /> : null}
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
