import React from 'react';

import MealList from '@/components/meal_list.component';

import { render } from '@testing-library/react-native';

describe('MealList', () => {
  const mockMeals = [
    { idMeal: '1', strMeal: 'Pizza', strMealThumb: 'url1' },
    { idMeal: '2', strMeal: 'Burger', strMealThumb: 'url2' },
  ];

  it('renders meal items', () => {
    const { getByText } = render(<MealList meals={mockMeals} />);

    expect(getByText('Pizza')).toBeTruthy();
    expect(getByText('Burger')).toBeTruthy();
  });
});
