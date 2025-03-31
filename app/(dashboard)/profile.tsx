import { useContext } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '@/components/primary_button.component';

import { logout } from '@/services/auth.service';
import { AuthContext } from '@/store/auth.context';
import { COLORS } from '@/theme/colors';

export default function ProfileScreen() {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert('Logout Failed', err.message);
      } else {
        Alert.alert('Logout Failed', 'An unknown error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're logged in 🎉</Text>
      <PrimaryButton
        title="Logout"
        onPress={handleLogout}
        style={styles.logoutButton}
        textStyle={styles.logoutText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 40, textAlign: 'center', color: COLORS.primary },
  logoutButton: {
    backgroundColor: COLORS.error,
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});
