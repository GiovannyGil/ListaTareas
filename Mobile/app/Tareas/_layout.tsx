import { Stack } from 'expo-router';

export default function TareasLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
        }}
      >
      <Stack.Screen 
        name="tareas" 
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}