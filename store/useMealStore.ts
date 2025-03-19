import { env } from '@/config/env';
import axios from 'axios';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealState {
  meals: Meal[];
  isLoading: boolean;
  error: string | null;
  fetchMeals: (query: string) => Promise<void>;
  clearMeals: () => void;
}

export const useMealStore = create<MealState>()(
  immer((set) => ({
    meals: [],
    isLoading: false,
    error: null,
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
  })),
);
