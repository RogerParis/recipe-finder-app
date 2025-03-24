import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  mealSuggestion: string;
  isLoading: boolean;
  onFetchSuggestion: () => void;
  onTrySuggestion: () => void;
}

const AISuggestionCard: React.FC<Props> = ({
  mealSuggestion,
  isLoading,
  onFetchSuggestion,
  onTrySuggestion,
}) => (
  <View style={styles.card}>
    <Text style={styles.title}>AI Suggestion</Text>
    {isLoading ? (
      <ActivityIndicator size="large" style={styles.loader} color="#1a237e" />
    ) : (
      <Text style={styles.suggestion}>{mealSuggestion}</Text>
    )}
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.flexButton]} onPress={onFetchSuggestion}>
        <Text style={styles.buttonText}>Get Another</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.flexButton, styles.tryButton]}
        onPress={onTrySuggestion}>
        <Text style={styles.buttonText}>Try This</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1a237e',
  },
  suggestion: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#424242',
    lineHeight: 24,
  },
  loader: { marginVertical: 16 },
  button: {
    backgroundColor: '#1a237e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  flexButton: { flex: 1 },
  tryButton: { backgroundColor: '#2e7d32' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  buttonContainer: { flexDirection: 'row', gap: 8, marginTop: 8 },
});

export default React.memo(AISuggestionCard);
