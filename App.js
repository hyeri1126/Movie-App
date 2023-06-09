import { NavigationContainer, DarkTheme, DefaultTheme, StackActions} from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import Tabs from './navigation/Tabs';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {Ionicons} from "@expo/vector-icons";
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styled';
import { QueryClient, QueryClientProvider } from 'react-query';

// SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";
  // const [appIsReady, setAppIsReady] = useState(false);


  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await Font.loadAsync(Ionicons.font);
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
    
   
    // <View>
    //   <Text>Hello hyeri</Text>
    // </View>
  );
}
