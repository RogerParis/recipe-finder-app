import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onSearch: () => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onClear, onSearch }) => (
  <View style={styles.searchSection}>
    <View style={styles.searchInputContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a meal..."
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#666"
      />
      {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear} testID="clear-search">
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
    <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  searchSection: { flexDirection: 'row', padding: 16, gap: 8 },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: { flex: 1, padding: 12, fontSize: 16 },
  searchButton: {
    backgroundColor: '#1a237e',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 100,
  },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  clearButton: { padding: 8, marginRight: 4 },
});

export default React.memo(SearchBar);
