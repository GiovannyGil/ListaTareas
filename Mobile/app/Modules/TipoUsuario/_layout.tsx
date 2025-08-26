import { Stack } from 'expo-router';

export default function TipoUsuarioLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
        }}
      >
      <Stack.Screen 
        name="tipousuario" 
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}