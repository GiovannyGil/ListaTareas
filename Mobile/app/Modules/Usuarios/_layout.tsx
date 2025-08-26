import { Stack } from 'expo-router';

export default function UsuariosLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
        }}
      >
      <Stack.Screen 
        name="usuarios" 
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}