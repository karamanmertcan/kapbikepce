import { Provider as PaperProvider } from 'react-native-paper';
import React, { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import StackScreen from './navigations/StackScreen';
import { StyleSheet, Text, View } from 'react-native';
import { useAtom } from 'jotai';
import { getTokenAndUserFromStorage, userState } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IntroSlider from './components/IntroSlider';
import TabNavigation from './navigations/TabNavigation';
import axios from 'axios';

export default function App() {
  const [auth, setAuth] = useAtom(getTokenAndUserFromStorage);
  useEffect(() => {
    setAuth();
  }, []);
  return (
    <>
      <SafeAreaProvider>
        <PaperProvider>
          <FlashMessage position='top' statusBarHeight={'50'} autoHide={true} />
          <StackScreen />
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
