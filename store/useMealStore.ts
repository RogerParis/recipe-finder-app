import { MMKV } from 'react-native-mmkv';

import { env } from '@/config/env';
import axios from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const storage = new MMKV();

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealState {
  meals: Meal[];
  isLoading: boolean;
  error: string | null;
  favoriteMealIds: string[];
  fetchMeals: (query: string) => Promise<void>;
  clearMeals: () => void;
  toggleFavoriteMeal: (mealId: string) => void;
  isMealFavorite: (mealId: string) => boolean;
  getFavoriteMeals: () => Meal[];
}

export const useMealStore = create<MealState>()(
  persist(
    immer((set, get) => ({
      meals: [],
      isLoading: false,
      error: null,
      favoriteMealIds: [],

      fetchMeals: async (query) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        try {
          const response = await axios.get(`${env.API_URL}/search.php?s=${query}`);
          set((state) => {
            state.meals = response.data.meals || [];
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

      clearMeals: () => {
        set((state) => {
          state.meals = [];
          state.error = null;
        });
      },

      toggleFavoriteMeal: (mealId) => {
        set((state) => {
          const isFav = state.favoriteMealIds.includes(mealId);
          if (isFav) {
            state.favoriteMealIds = state.favoriteMealIds.filter((id) => id !== mealId);
          } else {
            state.favoriteMealIds.push(mealId);
          }
        });
      },

      isMealFavorite: (mealId) => {
        return get().favoriteMealIds.includes(mealId);
      },

      getFavoriteMeals: () => {
        const { meals, favoriteMealIds } = get();
        return meals.filter((meal) => favoriteMealIds.includes(meal.idMeal));
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
        favoriteMealIds: state.favoriteMealIds,
      }),
    },
  ),
);
