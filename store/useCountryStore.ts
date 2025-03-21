import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Country {
  code: string;
  name: string;
  emoji: string;
}

interface CountryState {
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
  clearSelectedCountry: () => void;
}

export const useCountryStore = create<CountryState>()(
  immer((set) => ({
    selectedCountry: null,
    setSelectedCountry: (country) =>
      set((state) => {
        state.selectedCountry = country;
      }),
    clearSelectedCountry: () =>
      set((state) => {
        state.selectedCountry = null;
      }),
  })),
);
