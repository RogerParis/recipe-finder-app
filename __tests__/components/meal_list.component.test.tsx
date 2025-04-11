import React from 'react';

import MealList from '@/components/meals/meal_list.component';

import { render } from '@testing-library/react-native';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('MealList', () => {
  const mockMeals = [
    { idMeal: '1', strMeal: 'Pizza', strMealThumb: 'url1', strInstructions: 'Bake in oven.' },
    { idMeal: '2', strMeal: 'Burger', strMealThumb: 'url2', strInstructions: 'Grill the patty.' },
  ];

  it('renders meal items', () => {
    const { getByText } = render(<MealList meals={mockMeals} />);

    expect(getByText('Pizza')).toBeTruthy();
    expect(getByText('Burger')).toBeTruthy();
  });
});
