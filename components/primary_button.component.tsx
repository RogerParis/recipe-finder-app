import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS } from '@/theme/colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  label: {
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
