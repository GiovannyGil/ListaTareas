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
            <div className="card">
              <h2>Bienvenido a la pantalla principal!</h2>
            </div>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
}

//  style={{ flex: 1, height: '100%', backgroundColor: '#09c071ff', width: '100%' }}
const styles = StyleSheet.create({})