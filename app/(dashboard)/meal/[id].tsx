import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';

import { useMealStore } from '@/store/meals/useMealStore';

const MealDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedMeal, fetchMealById } = useMealStore();

  useEffect(() => {
    if (!id) return;
    fetchMealById(id);
  }, [id]);

  if (!selectedMeal) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Meal not found. Please try another one.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: selectedMeal.strMealThumb }} style={styles.image} contentFit="cover" />
      <Text style={styles.title}>{selectedMeal.strMeal}</Text>
      <Text style={styles.instructions}>{selectedMeal.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 250, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  instructions: { fontSize: 16, textAlign: 'justify', marginTop: 10 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#c62828',
    textAlign: 'center',
  },
});

export default MealDetailScreen;
