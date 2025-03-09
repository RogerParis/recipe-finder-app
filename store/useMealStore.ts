import { env } from '@/config/env';
import axios from 'axios';
import { create } from 'zustand';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealState {
  meals: Meal[];
  fetchMeals: (query: string) => Promise<void>;
}

export const useMealStore = create<MealState>((set) => ({
  meals: [],
  fetchMeals: async (query) => {
    try {
      const response = await axios.get(`${env.API_URL}/search.php?s=${query}`);
      set({ meals: response.data.meals });
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  },
}));
