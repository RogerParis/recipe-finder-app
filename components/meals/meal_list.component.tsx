import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import MealListItem from './meal_list_item.component';

import { Meal } from '@/store/meals/types';

interface Props {
  meals: Meal[];
}

const MealList: React.FC<Props> = ({ meals }) => {
  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={styles.listContent}
      initialNumToRender={6}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews
      getItemLayout={(_, index) => ({ length: 232, offset: 232 * index, index })}
      renderItem={({ item }) => <MealListItem meal={item} />}
    />
  );
};

const styles = StyleSheet.create({
  listContent: { padding: 16 },
});

export default React.memo(MealList);
