import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { useAISuggestions } from '@/store/useAISuggestions';
import { useMealStore } from '@/store/useMealStore';

const HomeScreen = () => {
  const router = useRouter();
  const [queryMealSuggestion, setQueryMealSuggestion] = useState('');
  const { meals, fetchMeals } = useMealStore();
  const { mealSuggestion, fetchAISuggestion } = useAISuggestions();

  useEffect(() => {
    fetchAISuggestion();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal of the Day (AI Powered) 🍽️</Text>
      {mealSuggestion ? (
        <Text style={styles.suggestion}>{mealSuggestion}</Text>
      ) : (
        <ActivityIndicator size="large" />
      )}
      <Button title="Get Another Suggestion" onPress={fetchAISuggestion} />

      <TextInput
        style={styles.input}
        placeholder="Search for a meal..."
        value={queryMealSuggestion}
        onChangeText={setQueryMealSuggestion}
      />
      <Button title="Search" onPress={() => fetchMeals(queryMealSuggestion)} />

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.mealName} onPress={() => router.push(`/meal/${item.idMeal}`)}>
              {item.strMeal}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  suggestion: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  mealItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  mealName: { fontSize: 18, fontWeight: 'bold', color: 'blue' },
});

export default HomeScreen;
