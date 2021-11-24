import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import StackScreen from './navigations/StackScreen';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <PaperProvider>
        <StackScreen />
      </PaperProvider>
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
