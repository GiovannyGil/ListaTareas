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
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#4682B4', marginBottom: 10 }}>
              Home
            </Text>
            <Text style={{ fontSize: 16, color: '#2a8ef3ff' }}>
              ¡Bienvenido a la pantalla principal!
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
}

//  style={{ flex: 1, height: '100%', backgroundColor: '#09c071ff', width: '100%' }}
const styles = StyleSheet.create({})