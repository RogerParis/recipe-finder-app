import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useCountryStore } from '@/store/useCountryStore';

const CountrySelector = () => {
  const { selectedCountry, clearSelectedCountry } = useCountryStore();
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity style={styles.countryButton} onPress={() => router.push('/countries')}>
        <Text style={styles.countryButtonText}>Select a Country</Text>
      </TouchableOpacity>
      {selectedCountry && (
        <View style={styles.selectedCountryContainer}>
          <Text style={styles.selectedCountryText}>
            Selected Country: {selectedCountry.code} {selectedCountry.name} {selectedCountry.emoji}
          </Text>
          <TouchableOpacity onPress={clearSelectedCountry}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  countryButton: {
    backgroundColor: '#1a237e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    zIndex: 1,
  },
  countryButtonText: { color: '#fff', fontSize: 16 },
  selectedCountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  selectedCountryText: {
    fontSize: 16,
    color: '#424242',
    marginRight: 8,
  },
});

export default React.memo(CountrySelector);
