import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '../components/CategoryCard';
import RestaurantCard from '../components/ResteurantCard';
import SeacrhBarComp from '../components/SearchBar';
import * as Location from 'expo-location';
import axios from 'axios';
import HomeScreenCarousel from '../components/HomeScreenCarousel';
import { useAtom } from 'jotai';
import { userState, getTokenAndUserFromStorage } from '../store';

interface IHomeScreenProps {}

const HomeScreen: React.FunctionComponent<IHomeScreenProps> = (props) => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [userToken, setUserToken] = useAtom(userState);
  const [restaurants, setRestaurants] = useState<any>([]);
  const [searchBarText, setSearchBarText] = useState<any>(``);
  const windowHeight = useWindowDimensions().height;

  console.log(userToken);

  const getRestaurants = async () => {
    const { data } = await axios.get('http://192.168.1.2:8000/api/get-restaurants', {
      headers: {
        Authorization: `Bearer ${userToken.token}`
      }
    });
    console.log(data);
    setRestaurants(data);
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25
            }}>
            Kap Bir Kepçe
          </Text>
        </View>
        <View
          style={{
            marginTop: '5%'
          }}>
          <SeacrhBarComp searchBarText={searchBarText} setSearchBarText={setSearchBarText} />
        </View>
        {/* <View>
          <Text>{JSON.stringify(product, null>, 4)}</Text>
        </View> */}
        <ScrollView>
          <View style={styles.categoryCard}>
            <HomeScreenCarousel />
          </View>
          <View
            style={{
              flex: 5,
              padding: 20,
              paddingBottom: 300
            }}>
            <Text style={styles.restaurantHeader}>Restaurantlar</Text>
            {restaurants &&
              restaurants.length > 0 &&
              restaurants.map((restaurant: any) => (
                <RestaurantCard restaurant={restaurant} key={restaurant._id} />
              ))}
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
    minHeight: 70,
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
