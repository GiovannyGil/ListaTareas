import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
        }}
      >
      <Stack.Screen 
        name="home" 
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack>
  );
}