import { Text, View } from 'react-native';

import { router } from 'expo-router';

import PrimaryButton from '@/components/common/primary_button.component';

export default function Landing() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>
        Welcome to RecipeFinder
      </Text>
      <PrimaryButton title="Sign In" onPress={() => router.push('/(auth)/signin')} />
      <PrimaryButton title="Register" onPress={() => router.push('/(auth)/register')} />
    </View>
  );
}
