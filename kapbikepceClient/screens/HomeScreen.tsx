import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, useWindowDimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '../components/CategoryCard';
import RestaurantCard from '../components/ResteurantCard';
import SeacrhBarComp from '../components/SearchBar';
import * as Location from 'expo-location';
import axios from 'axios';

interface IHomeScreenProps {}

const HomeScreen: React.FunctionComponent<IHomeScreenProps> = (props) => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== 'granted') {
    //     setErrorMsg('Permission to access location was denied');
    //     return;
    //   }
    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    // })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }

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
            marginTop: '5%'
          }}>
          <SeacrhBarComp />
        </View>
        {/* <View>
          <Text>{JSON.stringify(product, null, 4)}</Text>
        </View> */}
        <ScrollView>
          <View style={styles.categoryCard}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
            </ScrollView>
          </View>
          <View
            style={{
              flex: 5,
              padding: 20,
              paddingBottom: 300
            }}>
            <Text style={styles.restaurantHeader}>Restaurantlar</Text>
            <RestaurantCard />
            <RestaurantCard />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  categoryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '20%'
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
  },
  restaurantHeader: {
    fontSize: 30
  }
});

export default HomeScreen;
