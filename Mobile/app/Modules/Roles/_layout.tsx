import { Stack } from 'expo-router';

export default function RolesLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
        }}
      >
      <Stack.Screen 
        name="roles" 
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}