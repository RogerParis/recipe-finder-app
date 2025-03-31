import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { Meal } from '@/store/useMealStore';
import { COLORS } from '@/theme/colors';

interface Props {
  meals: Meal[];
}

const MealList: React.FC<Props> = ({ meals }) => {
  const router = useRouter();

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
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.mealCard}
          onPress={() => router.push(`/meal/${item.idMeal}`)}>
          <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} contentFit="cover" />
          <View style={styles.mealTitleContainer}>
            <Text style={styles.mealTitle} numberOfLines={2}>
              {item.strMeal}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContent: { padding: 16 },
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
});

export default React.memo(MealList);
