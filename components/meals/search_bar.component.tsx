import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/theme/colors';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onClear }) => (
  <View style={styles.searchSection}>
    <View style={styles.searchInputContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a meal..."
        value={value}
        onChangeText={onChange}
        placeholderTextColor={COLORS.text}
      />
      {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear} testID="clear-search">
          <Ionicons name="close-circle" size={20} color={COLORS.text} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  searchSection: { flexDirection: 'row', padding: 16, gap: 8 },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: { flex: 1, padding: 12, fontSize: 16 },
  clearButton: { padding: 8, marginRight: 4 },
});

export default React.memo(SearchBar);
