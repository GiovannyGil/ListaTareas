import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function HomeScreen() {  
  const [titleText, setTitleText] = useState("Bird's Nest");

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };
 return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image className='logo'
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={{ width: 50, height: 50 }}
        />
        <Text style={[styles.baseText, styles.titleText]} onPress={onPressTitle}> Iniciar sesión </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 18,
    color: 'white',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  logo : {
    width: 50,
    height: 50,
  }
});
