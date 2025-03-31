import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useCountryStore } from '@/store/useCountryStore';
import { COLORS } from '@/theme/colors';

const CountrySelectorHeader = () => {
  const { selectedCountry, clearSelectedCountry } = useCountryStore();

  return (
    <View>
      {selectedCountry && (
        <View style={styles.selectedCountryContainer}>
          <Text style={styles.selectedCountryText}>
            Selected Country: {selectedCountry.code} {selectedCountry.name} {selectedCountry.emoji}
          </Text>
          <TouchableOpacity onPress={clearSelectedCountry} testID="clear-country-button">
            <Ionicons name="close-circle" size={20} color={COLORS.icon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedCountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  selectedCountryText: {
    fontSize: 16,
    color: COLORS.text,
    marginRight: 8,
  },
});

export default React.memo(CountrySelectorHeader);
