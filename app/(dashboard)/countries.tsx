import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import CountrySelectorHeader from '@/components/countries/country_selector_header.component';

import { COUNTRIES_QUERY } from '@/services/apollo.service';
import { Country, useCountryStore } from '@/store/useCountryStore';
import { useQuery } from '@apollo/client';

export default function CountriesScreen() {
  const { data, loading, error } = useQuery(COUNTRIES_QUERY);
  const { setSelectedCountry } = useCountryStore();

  if (loading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error fetching countries</Text>;

  return (
    <FlatList
      data={data.countries}
      keyExtractor={(item) => item.code}
      contentContainerStyle={styles.list}
      ListHeaderComponent={CountrySelectorHeader}
      renderItem={({ item }: { item: Country }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            setSelectedCountry(item);
          }}>
          <Text style={styles.text}>
            {item.emoji} {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loading: { padding: 20, textAlign: 'center' },
  error: { color: 'red', padding: 20, textAlign: 'center' },
  list: { padding: 16 },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: { fontSize: 16 },
});
