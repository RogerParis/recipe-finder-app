import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ReactNativeFirebase } from '@react-native-firebase/app';
import {
  FirebaseAuthTypes,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: 'autoDetect', // from Firebase Console → Project settings → OAuth
});
const auth = getAuth();

export default function LoginScreen() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseAuthTypes.User) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { data } = await GoogleSignin.signIn();

      const googleCredential = GoogleAuthProvider.credential(data?.idToken);
      await signInWithCredential(auth, googleCredential);
    } catch (e: unknown) {
      const err = e as ReactNativeFirebase.NativeFirebaseError;
      console.error(err);
      Alert.alert('Login error', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Recipe Finder</Text>

      {user ? (
        <>
          <Text style={styles.user}>Logged in as {user.displayName}</Text>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  button: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18 },
  user: { fontSize: 16, marginTop: 20 },
});
