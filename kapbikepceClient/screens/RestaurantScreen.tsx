import * as React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IRestaurantScreenProps {}

const RestaurantScreen: React.FunctionComponent<IRestaurantScreenProps> = (props) => {
  const windowHeight = useWindowDimensions().height;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25
            }}>
            Kap Bi Kepçe
          </Text>
        </View>

        <View
          style={{
            flex: 5,
            padding: 20,
            paddingBottom: 300
          }}>
          <Text>Restaurantlar</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4757',
    height: '10%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'relative',
    top: 0,
    left: 0
  }
});

export default RestaurantScreen;
