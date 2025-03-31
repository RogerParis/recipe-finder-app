import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';

import { COLORS } from '@/theme/colors';

export default function MainMenu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/meal')}>
        <Text style={styles.buttonText}>Recipe Finder</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/countries')}>
        <Text style={styles.buttonText}>Country Selection</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: COLORS.white, fontSize: 18 },
});
