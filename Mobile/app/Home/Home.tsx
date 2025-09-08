import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';


export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      {/* <Stack.Screen
        options={{
          headerShown: true,
          title: 'Home', // Por si acaso
        }}
      /> */}
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FDFF' }}>
          <View style={{ height: '50%', justifyContent: 'center', alignItems: 'center' }}>
            {/* card con contenido de bienvenida */}
            <View style={{ width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}></View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Bienvenido a la App</Text>
              <Text style={{ fontSize: 16, color: '#666' }}>Esta es una aplicación de ejemplo para mostrar cómo se ve el contenido en la pantalla de inicio.</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
}

//  style={{ flex: 1, height: '100%', backgroundColor: '#09c071ff', width: '100%' }}
const styles = StyleSheet.create({})