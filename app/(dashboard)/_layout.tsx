import { Stack } from 'expo-router';

import { COLORS } from '@/theme/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
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
    </Stack>
  );
}
