export interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

export interface MealState {
  meals: Meal[];
  isLoading: boolean;
  error: string | null;
  favoriteMealIds: string[];
  selectedMeal: Meal | null;
  fetchMealById: (id: string) => Promise<Meal | null>;
  fetchMeals: (query: string) => Promise<void>;
  clearMeals: () => void;
  toggleFavoriteMeal: (mealId: string) => void;
  isMealFavorite: (mealId: string) => boolean;
  getFavoriteMeals: () => Meal[];
}
