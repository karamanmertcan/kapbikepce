import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

interface IProfileScreenProps {}

const ProfileScreen: React.FunctionComponent<IProfileScreenProps> = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
      <View style={styles.container}>
        <Header />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default ProfileScreen;
