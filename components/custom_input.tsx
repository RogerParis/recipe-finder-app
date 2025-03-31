import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function CustomInput(props: TextInputProps) {
  return (
    <TextInput style={styles.input} placeholderTextColor="#999" autoCapitalize="none" {...props} />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginTop: 12,
  },
});
