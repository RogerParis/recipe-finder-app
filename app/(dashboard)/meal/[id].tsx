import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';

import { env } from '@/config/env';
import axios from 'axios';

interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

const MealDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/lookup.php?i=${id}`);
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#FF5733" />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: meal?.strMealThumb }} style={styles.image} contentFit="cover" />
      <Text style={styles.title}>{meal?.strMeal}</Text>
      <Text style={styles.instructions}>{meal?.strInstructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 250, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  instructions: { fontSize: 16, textAlign: 'justify', marginTop: 10 },
});

export default MealDetailScreen;
