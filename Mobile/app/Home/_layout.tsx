import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Inicio"
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}