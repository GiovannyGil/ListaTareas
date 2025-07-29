import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {  
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };
 return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.baseText, styles.titleText]} onPress={onPressTitle}> Iniciar sesión </Text>
        <Text style={styles.baseText}>{bodyText}</Text>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={{ width: 50, height: 50 }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
