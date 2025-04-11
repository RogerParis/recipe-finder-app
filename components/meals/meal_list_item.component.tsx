import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Meal } from '@/store/meals/types';
import { useMealStore } from '@/store/meals/useMealStore';
import { COLORS } from '@/theme/colors';

interface Props {
  meal: Meal;
}

const MealListItem: React.FC<Props> = ({ meal }) => {
  const router = useRouter();
  const { toggleFavoriteMeal, isMealFavorite } = useMealStore();

  const renderRightActions = React.useCallback(
    (id: string) => {
      const isFavorite = isMealFavorite(id);
      return (
        <Pressable
          style={[
            styles.favoriteActionButton,
            { backgroundColor: isFavorite ? COLORS.red : COLORS.white },
          ]}
          onPress={() => toggleFavoriteMeal(id)}>
          <Ionicons
            name={isFavorite ? 'trash-bin' : 'heart-outline'}
            size={24}
            color={isFavorite ? COLORS.white : COLORS.red}
          />
        </Pressable>
      );
    },
    [toggleFavoriteMeal, isMealFavorite],
  );

  return (
    <Swipeable renderRightActions={() => renderRightActions(meal.idMeal)}>
      <Pressable style={styles.mealCard} onPress={() => router.push(`/meal/${meal.idMeal}`)}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.mealImage} contentFit="cover" />
        <View style={styles.mealTitleContainer}>
          <Text style={styles.mealTitle} numberOfLines={2}>
            {meal.strMeal}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  mealImage: { width: '100%', height: 200 },
  mealTitleContainer: { padding: 12 },
  mealTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  favoriteActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginBottom: 16,
    borderRadius: 12,
  },
});

export default React.memo(MealListItem);
