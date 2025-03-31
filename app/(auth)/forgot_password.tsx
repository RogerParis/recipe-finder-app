import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import CustomInput from '@/components/custom_input';
import PrimaryButton from '@/components/primary_button.component';

import { resetPassword } from '../../services/auth.service';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      await resetPassword(email);
      Alert.alert('Success', 'Check your email to reset your password.');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Reset Password</Text>
      <CustomInput placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <PrimaryButton title="Send Reset Link" onPress={handleReset} />
    </View>
  );
}
