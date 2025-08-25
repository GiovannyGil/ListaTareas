import { SafeAreaView, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function UsuariosScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FDFF' }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#4682B4', marginBottom: 10 }}>
            Home
          </Text>
          <Text style={{ fontSize: 16, color: '#2a8ef3ff' }}>
            ¡Bienvenido a la pantalla de usuarios!
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}