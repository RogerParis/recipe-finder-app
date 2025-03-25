import React from 'react';

import CountrySelectorHeader from '@/components/country_selector_header.component';

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
  it('clears selected country', () => {
    const mockCountry = { code: 'US', name: 'United States', emoji: '🇺🇸' };
    useCountryStore.getState().setSelectedCountry(mockCountry);

    const { getByTestId } = render(<CountrySelectorHeader />);

    const clearButton = getByTestId('clear-country-button');
    fireEvent.press(clearButton);

    expect(useCountryStore.getState().selectedCountry).toBeNull();
  });
});
