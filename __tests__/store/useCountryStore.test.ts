import { Country, useCountryStore } from '@/store/useCountryStore';
import { act } from '@testing-library/react-hooks';
import { renderHook } from '@testing-library/react-hooks';

describe('useCountryStore', () => {
  const mockCountry: Country = {
    code: 'US',
    name: 'United States',
    emoji: '🇺🇸',
  };

  afterEach(() => {
    // Reset store between tests
    const { result } = renderHook(() => useCountryStore());
    act(() => {
      result.current.clearSelectedCountry();
    });
  });

  it('should initialize with null selectedCountry', () => {
    const { result } = renderHook(() => useCountryStore());
    expect(result.current.selectedCountry).toBeNull();
  });

  it('should set selectedCountry', () => {
    const { result } = renderHook(() => useCountryStore());

    act(() => {
      result.current.setSelectedCountry(mockCountry);
    });

    expect(result.current.selectedCountry).toEqual(mockCountry);
  });

  it('should clear selectedCountry', () => {
    const { result } = renderHook(() => useCountryStore());

    act(() => {
      result.current.setSelectedCountry(mockCountry);
      result.current.clearSelectedCountry();
    });

    expect(result.current.selectedCountry).toBeNull();
  });
});
