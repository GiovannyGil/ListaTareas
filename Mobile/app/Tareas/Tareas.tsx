import { SafeAreaView, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TareasScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FDFF' }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#4682B4', marginBottom: 10 }}>
            Tareas
          </Text>
          <Text style={{ fontSize: 16, color: '#2a8ef3ff' }}>
            ¡Bienvenido a la pantalla de tareas!
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}