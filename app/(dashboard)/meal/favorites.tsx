import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { MaterialIcons } from '@expo/vector-icons';

import { useMealStore } from '@/store/meals/useMealStore';
import { COLORS } from '@/theme/colors';

const Favorites = () => {
  const { getFavoriteMeals, toggleFavoriteMeal } = useMealStore();
  const favorites = getFavoriteMeals();

  const renderRightActions = (id: string) => (
    <Pressable style={styles.unfavoriteButton} onPress={() => toggleFavoriteMeal(id)}>
      <MaterialIcons name="delete" size={24} color={COLORS.white} />
    </Pressable>
  );

  const renderItem = ({ item }: { item: { idMeal: string; strMeal: string } }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.idMeal)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.strMeal}</Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
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
