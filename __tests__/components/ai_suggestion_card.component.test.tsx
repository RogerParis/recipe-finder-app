import React from 'react';

import AISuggestionCard from '@/components/ai_suggestion_card.component';

import { fireEvent, render } from '@testing-library/react-native';

describe('AISuggestionCard', () => {
  it('renders suggestion text', () => {
    const { getByText } = render(
      <AISuggestionCard
        mealSuggestion="Test Meal"
        isLoading={false}
        onFetchSuggestion={jest.fn()}
        onTrySuggestion={jest.fn()}
      />,
    );
    expect(getByText('Test Meal')).toBeTruthy();
  });

  it('handles button presses', () => {
    const fetchMock = jest.fn();
    const tryMock = jest.fn();
    const { getByText } = render(
      <AISuggestionCard
        mealSuggestion="Test Meal"
        isLoading={false}
        onFetchSuggestion={fetchMock}
        onTrySuggestion={tryMock}
      />,
    );

    fireEvent.press(getByText('Get Another'));
    expect(fetchMock).toHaveBeenCalled();

    fireEvent.press(getByText('Try This'));
    expect(tryMock).toHaveBeenCalled();
  });
});
