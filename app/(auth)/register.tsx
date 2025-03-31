import { useContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import CustomInput from '@/components/custom_input';
import PrimaryButton from '@/components/primary_button.component';

import { register } from '../../services/auth.service';

import { AuthContext } from '@/store/auth.context';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const res = await register(email, password);
      setUser(res.user);
    } catch (err) {
      Alert.alert('Registration Failed', (err as Error).message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text>
      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <PrimaryButton title="Create Account" onPress={handleRegister} />
    </View>
  );
}
