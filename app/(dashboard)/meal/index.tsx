import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import AISuggestionCard from '@/components/meals/ai_suggestion_card.component';
import MealList from '@/components/meals/meal_list.component';
import SearchBar from '@/components/meals/search_bar.component';

import { useMealStore } from '@/store/meals/useMealStore';
import { useAISuggestions } from '@/store/useAISuggestions';
import debounce from 'lodash/debounce';

const MealScreen = () => {
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

  const triggerSearch = useCallback(
    debounce((searchQuery: string) => {
      fetchMeals(searchQuery);
    }, 500),
    [fetchMeals],
  );

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQueryMealSuggestion(searchQuery);
      triggerSearch(searchQuery);
    },
    [queryMealSuggestion, fetchMeals],
  );

  return (
    <View style={styles.container}>
      <AISuggestionCard
        mealSuggestion={mealSuggestion}
        isLoading={isLoading}
        onFetchSuggestion={handleFetchAISuggestion}
        onTrySuggestion={handleTrySuggestion}
      />

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

      <SearchBar value={queryMealSuggestion} onChange={handleSearch} onClear={handleClearSearch} />

      <MealList meals={meals} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    elevation: 3,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MealScreen;
