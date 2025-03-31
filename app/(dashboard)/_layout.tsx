import { Pressable } from 'react-native';

import { Stack } from 'expo-router';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '@/theme/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleAlign: 'center',
        headerRight: () => (
          <Pressable
            onPress={() => router.push('/(dashboard)/profile')}
            style={{ marginRight: 15 }}
            hitSlop={10}>
            <Ionicons name="person-outline" size={22} color={COLORS.white} />
          </Pressable>
        ),
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Choose a Feature',
        }}
      />
      <Stack.Screen
        name="meal/index"
        options={{
          title: 'Meal of the Day',
        }}
      />
      <Stack.Screen
        name="meal/[id]"
        options={{
          title: 'Meal Details',
        }}
      />
      <Stack.Screen
        name="countries"
        options={{
          title: 'Select a Country',
        }}
      />
      <Stack.Screen name="profile" options={{ title: 'Your Profile', headerRight: () => null }} />
    </Stack>
  );
}
