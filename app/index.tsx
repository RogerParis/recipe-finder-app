import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useAISuggestions } from '@/store/useAISuggestions';
import { Meal, useMealStore } from '@/store/useMealStore';

const HomeScreen = () => {
  const router = useRouter();
  const [queryMealSuggestion, setQueryMealSuggestion] = useState('');
  const errorOpacity = useRef(new Animated.Value(0)).current;
  const { meals, fetchMeals, clearMeals } = useMealStore();
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

  const handleFetchAISuggestion = useCallback(async () => {
    try {
      await fetchAISuggestion();
    } catch (err) {
      console.error('Error fetching AI suggestion:', err);
    }
  }, [fetchAISuggestion]);

  const handleTrySuggestion = useCallback(() => {
    setQueryMealSuggestion(mealSuggestion);
    fetchMeals(mealSuggestion);
  }, [mealSuggestion, fetchMeals]);

  const handleClearSearch = useCallback(() => {
    setQueryMealSuggestion('');
    clearMeals();
  }, [clearMeals]);

  const handleSearch = useCallback(() => {
    Keyboard.dismiss();
    fetchMeals(queryMealSuggestion);
  }, [queryMealSuggestion, fetchMeals]);

  const renderMealItem = useCallback(
    ({ item }: { item: Meal }) => (
      <TouchableOpacity style={styles.mealCard} onPress={() => router.push(`/meal/${item.idMeal}`)}>
        <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
        <View style={styles.mealTitleContainer}>
          <Text style={styles.mealTitle} numberOfLines={2}>
            {item.strMeal}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [router],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.countryButton} onPress={() => router.push('/countries')}>
        <Text style={styles.countryButtonText}>Select a Country</Text>
      </TouchableOpacity>
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
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a meal..."
            value={queryMealSuggestion}
            onChangeText={setQueryMealSuggestion}
            placeholderTextColor="#666"
          />
          {queryMealSuggestion.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderMealItem}
        contentContainerStyle={styles.listContent}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        getItemLayout={(_data, index) => ({
          length: 232,
          offset: 232 * index,
          index,
        })}
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
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'transparent',
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
  clearButton: {
    padding: 8,
    marginRight: 4,
  },
  countryButton: {
    backgroundColor: '#1a237e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    zIndex: 1,
  },
  countryButtonText: { color: '#fff', fontSize: 16 },
});

export default HomeScreen;
