import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './index.css'

export default function HomeScreen() {  
  const [titleText, setTitleText] = useState("Bird's Nest");

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };
 return (
    <SafeAreaProvider>
      <SafeAreaView className='container'>
        <Text 
          className='baseText titleText' onPress={onPressTitle}
        > 
          Iniciar sesión 
        </Text>
      

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

