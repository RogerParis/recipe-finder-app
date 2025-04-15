import { MMKV } from 'react-native-mmkv';

import { fetchMealByIdFromApi, fetchMealsFromApi } from './mealApi';
import { MealState } from './types';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const storage = new MMKV();

export const useMealStore = create<MealState>()(
  persist(
    immer((set, get) => ({
      meals: [],
      isLoading: false,
      error: null,
      favoriteMeals: [],
      selectedMeal: null,

      fetchMeals: async (query) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        try {
          const meals = await fetchMealsFromApi(query);
          set((state) => {
            state.meals = meals;
          });
        } catch (error) {
          console.error('Error fetching meals:', error);
          set((state) => {
            state.error = 'Failed to fetch meals.';
          });
        } finally {
          set((state) => {
            state.isLoading = false;
          });
        }
      },

      fetchMealById: async (id) => {
        try {
          const meal = await fetchMealByIdFromApi(id);
          set((state) => {
            state.selectedMeal = meal;
          });
          return meal;
        } catch (error) {
          console.error('Error fetching meal by ID:', error);
          return null;
        }
      },

      clearMeals: () => {
        set((state) => {
          state.meals = [];
          state.error = null;
        });
      },

      toggleFavoriteMeal: (meal) => {
        set((state) => {
          const isFav = state.favoriteMeals.some((favMeal) => favMeal.idMeal === meal.idMeal);
          if (isFav) {
            state.favoriteMeals = state.favoriteMeals.filter(
              (favMeal) => favMeal.idMeal !== meal.idMeal,
            );
          } else {
            state.favoriteMeals.push(meal);
          }
        });
      },

      isMealFavorite: (mealId) => {
        return get().favoriteMeals.some((meal) => meal.idMeal === mealId);
      },

      getFavoriteMeals: () => {
        return get().favoriteMeals;
      },

      setSelectedMeal: (meal) => {
        set((state) => {
          state.selectedMeal = meal;
        });
      },
    })),
    {
      name: 'meal-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) => storage.getString(key) ?? null,
        setItem: storage.set.bind(storage),
        removeItem: storage.delete.bind(storage),
      })),
      partialize: (state) => ({
        favoriteMeals: state.favoriteMeals,
      }),
    },
  ),
);
