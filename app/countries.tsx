import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';

import { COUNTRIES_QUERY } from '@/services/apollo.service';
import { useQuery } from '@apollo/client';

export default function CountriesScreen() {
  const { data, loading, error } = useQuery(COUNTRIES_QUERY);
  const router = useRouter();

  if (loading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error fetching countries</Text>;

  return (
    <FlatList
      data={data.countries}
      keyExtractor={(item) => item.code}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            router.push({
              pathname: '/',
              params: { country: item.name },
            })
          }>
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
