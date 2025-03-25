import React from 'react';

import CountrySelector from '@/components/country_selector.component';

import { useCountryStore } from '@/store/useCountryStore';
import { fireEvent, render } from '@testing-library/react-native';

jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    Ionicons: (props: unknown) => React.createElement('Ionicons', props),
  };
});

describe('CountrySelector', () => {
  it('renders Select a Country button', () => {
    const { getByText } = render(<CountrySelector />);
    expect(getByText('Select a Country')).toBeTruthy();
  });

  it('clears selected country', () => {
    const mockCountry = { code: 'US', name: 'United States', emoji: '🇺🇸' };
    useCountryStore.getState().setSelectedCountry(mockCountry);

    const { getByTestId } = render(<CountrySelector />);

    const clearButton = getByTestId('clear-country-button');
    fireEvent.press(clearButton);

    expect(useCountryStore.getState().selectedCountry).toBeNull();
  });
});
