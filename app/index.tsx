import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

import { useAISuggestions } from '@/store/useAISuggestions';
import { useMealStore } from '@/store/useMealStore';

const HomeScreen = () => {
  const router = useRouter();
  const [queryMealSuggestion, setQueryMealSuggestion] = useState('');
  const [errorOpacity] = useState(new Animated.Value(0));
  const { meals, fetchMeals } = useMealStore();
  const { mealSuggestion, fetchAISuggestion, isLoading, error } = useAISuggestions();

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(errorOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(errorOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  useEffect(() => {
    fetchAISuggestion();
  }, []);

  const handleFetchAISuggestion = async () => {
    try {
      await fetchAISuggestion();
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleTrySuggestion = () => {
    setQueryMealSuggestion(mealSuggestion);
    fetchMeals(mealSuggestion);
  };

  return (
    <View style={styles.container}>
      <View style={styles.suggestionCard}>
        <Text style={styles.suggestionTitle}>AI Suggestion</Text>
        {isLoading ? (
          <ActivityIndicator size="large" style={styles.loader} color="#1a237e" />
        ) : (
          <Text style={styles.suggestion}>{mealSuggestion}</Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonFlex]}
            onPress={handleFetchAISuggestion}>
            <Text style={styles.buttonText}>Get Another</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonFlex, styles.tryButton]}
            onPress={handleTrySuggestion}>
            <Text style={styles.buttonText}>Try This</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={[
          styles.errorContainer,
          {
            opacity: errorOpacity,
            transform: [
              {
                translateY: errorOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          },
        ]}>
        <Text style={styles.errorText}>
          {error || 'Failed to fetch suggestion. Please try again.'}
        </Text>
      </Animated.View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a meal..."
          value={queryMealSuggestion}
          onChangeText={setQueryMealSuggestion}
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => fetchMeals(queryMealSuggestion)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.mealCard}
            onPress={() => router.push(`/meal/${item.idMeal}`)}>
            <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
            <View style={styles.mealTitleContainer}>
              <Text style={styles.mealTitle} numberOfLines={2}>
                {item.strMeal}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  suggestionCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1a237e',
  },
  suggestion: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#424242',
    lineHeight: 24,
  },
  loader: {
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#1a237e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  searchSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchButton: {
    backgroundColor: '#1a237e',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 100,
  },
  listContent: {
    padding: 16,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealImage: {
    width: '100%',
    height: 200,
  },
  mealTitleContainer: {
    padding: 12,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  buttonFlex: {
    flex: 1,
  },
  tryButton: {
    backgroundColor: '#2e7d32',
  },
});

export default HomeScreen;
