import { Alert, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '@/components/common/primary_button.component';

import { logout } from '@/services/auth.service';
import { useAuth } from '@/store/auth.context';
import { COLORS } from '@/theme/colors';

export default function ProfileScreen() {
  const { user, setUser } = useAuth();

  const confirmLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              setUser(null);
            } catch (err: unknown) {
              Alert.alert(
                'Logout Failed',
                err instanceof Error ? err.message : 'An unknown error occurred',
              );
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're logged in 🎉</Text>
      {user?.email && <Text style={styles.email}>Email: {user.email}</Text>}
      <PrimaryButton
        title="Logout"
        onPress={confirmLogout}
        style={styles.logoutButton}
        textStyle={styles.logoutText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 40, textAlign: 'center', color: COLORS.primary },
  email: { fontSize: 16, textAlign: 'center', marginBottom: 40, color: COLORS.text },

  logoutButton: {
    backgroundColor: COLORS.error,
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});
