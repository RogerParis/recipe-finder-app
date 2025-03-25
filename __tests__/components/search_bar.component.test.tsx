import React from 'react';

import SearchBar from '@/components/search_bar.component';

import { fireEvent, render } from '@testing-library/react-native';

jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    Ionicons: (props: unknown) => React.createElement('Ionicons', props),
  };
});

describe('SearchBar', () => {
  it('updates input text', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChange={onChangeMock} onClear={jest.fn()} onSearch={jest.fn()} />,
    );

    const input = getByPlaceholderText('Search for a meal...');
    fireEvent.changeText(input, 'Chicken');
    expect(onChangeMock).toHaveBeenCalledWith('Chicken');
  });

  it('handles search button', () => {
    const onClearMock = jest.fn();
    const onSearchMock = jest.fn();
    const { getByText } = render(
      <SearchBar value="Test" onChange={jest.fn()} onClear={onClearMock} onSearch={onSearchMock} />,
    );

    fireEvent.press(getByText('Search'));
    expect(onSearchMock).toHaveBeenCalled();
  });

  it('handles clear button', () => {
    const onClearMock = jest.fn();
    const onSearchMock = jest.fn();
    const { getByTestId } = render(
      <SearchBar value="Test" onChange={jest.fn()} onClear={onClearMock} onSearch={onSearchMock} />,
    );

    fireEvent.press(getByTestId('clear-search'));
    expect(onClearMock).toHaveBeenCalled();
  });
});
