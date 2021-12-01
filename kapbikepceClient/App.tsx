import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import StackScreen from './navigations/StackScreen';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IntroSlider from './components/IntroSlider';
import TabNavigation from './navigations/TabNavigation';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <PaperProvider>
          <TabNavigation />
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
