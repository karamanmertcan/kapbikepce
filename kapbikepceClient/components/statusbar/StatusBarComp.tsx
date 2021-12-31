import React from 'react';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyStatusBar: React.FC<any> = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 6 : 10;

const styles = StyleSheet.create({
  statusBar: {
    height: APPBAR_HEIGHT
  }
});

export default MyStatusBar;
