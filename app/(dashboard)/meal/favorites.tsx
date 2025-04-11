import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import MealListItem from '@/components/meals/meal_list_item.component';

import { useMealStore } from '@/store/meals/useMealStore';
import { COLORS } from '@/theme/colors';

const Favorites = () => {
  const { getFavoriteMeals } = useMealStore();
  const favorites = getFavoriteMeals();

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <MealListItem meal={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  unfavoriteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default Favorites;
