import { Image } from 'expo-image';
import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import './explore.css'

export default function TabTwoScreen() {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };
 return (
    <SafeAreaProvider>
      <SafeAreaView className='container'>
        <Text className='baseText titleText' onPress={onPressTitle}> Registrarse </Text>
        <Text className='baseText'>{bodyText}</Text>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={{ width: 50, height: 50 }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

