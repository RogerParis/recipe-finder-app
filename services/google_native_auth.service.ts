import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const auth = getAuth();

export const signInWithGoogle = async (): Promise<FirebaseAuthTypes.UserCredential> => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const signInResult = await GoogleSignin.signIn().catch((error) => {
    console.error('Google Sign-In error:', error);
    throw new Error('Google Sign-In failed');
  });

  const idToken = signInResult.data?.idToken;
  if (!idToken) {
    throw new Error('No ID token found');
  }

  const googleCredential = GoogleAuthProvider.credential(idToken);

  return signInWithCredential(auth, googleCredential);
};
