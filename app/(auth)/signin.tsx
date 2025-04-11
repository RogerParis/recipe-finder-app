import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';

import CustomInput from '@/components/common/custom_input';
import PrimaryButton from '@/components/common/primary_button.component';

import { login } from '../../services/auth.service';

import { useAuth } from '@/store/auth.context';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      setUser(res.user);
    } catch (err) {
      Alert.alert('Login Failed', err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign In</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <PrimaryButton title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => router.push('/(auth)/forgot_password')}>
        <Text style={{ marginTop: 16, color: '#0A84FF' }}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}
