import { Meal } from './types';

import { env } from '@/config/env';
import axios from 'axios';

export const fetchMealsFromApi = async (query: string): Promise<Meal[]> => {
  const response = await axios.get(`${env.API_URL}/search.php?s=${query}`);
  return response.data.meals || [];
};

export const fetchMealByIdFromApi = async (id: string): Promise<Meal | null> => {
  const response = await axios.get(`${env.API_URL}/lookup.php?i=${id}`);
  return response.data.meals?.[0] || null;
};
