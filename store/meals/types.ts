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
  favoriteMeals: Meal[];
  selectedMeal: Meal | null;
  fetchMealById: (id: string) => Promise<Meal | null>;
  fetchMeals: (query: string) => Promise<void>;
  clearMeals: () => void;
  toggleFavoriteMeal: (meal: Meal) => void;
  isMealFavorite: (mealId: string) => boolean;
  getFavoriteMeals: () => Meal[];
  setSelectedMeal: (meal: Meal) => void;
}
