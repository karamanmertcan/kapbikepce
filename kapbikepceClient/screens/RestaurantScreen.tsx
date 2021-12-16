import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import Header from '../components/Header';
import RestaurantFoodCard from '../components/RestaurantFoodCard';
import CommentBottomSheet from '../components/comments/CommentBottomSheet';
import { useAtom } from 'jotai';
import { userState } from '../store';

interface IRestaurantScreenProps {}

interface FakeStoreApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const IsCartEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <ActivityIndicator size='small' color='#0000ff' />
    </View>
  );
};

const RestaurantScreen: React.FunctionComponent<IRestaurantScreenProps> = (props) => {
  const [restaurantData, setRestaurantData] = React.useState<any>([]);
  const [userToken, setUserToken] = useAtom(userState);
  const [isLoading, setIsLoading] = React.useState(false);
  const refRBSheet = React.useRef<any>();

  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const isFocused = useIsFocused();

  const { restaurantId } = route.params;

  const getProductsFromApi = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `http://192.168.1.2:8000/api/get-restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`
          }
        }
      );
      console.log('restaurant data', data);
      setRestaurantData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      getProductsFromApi();
    }
  }, [props, isFocused]);

  const sheetRef = React.useRef<any>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
      <View style={[styles.container]}>
        <Header routeName={route.name} />
        <View
          style={{
            flex: 2
          }}>
          <Image
            style={{
              height: '100%'
            }}
            resizeMode='cover'
            source={{
              uri: `${restaurantData.image?.url}`
            }}
          />
        </View>

        <View
          style={{
            flex: 4,
            flexDirection: 'column',
            padding: 20
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Text style={styles.restaurantHeader}>{restaurantData.restaurantName}</Text>
            <View style={styles.rateBox}>
              <Text>5</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10
              }}>
              <Entypo name='location' size={16} color='black' />
              <Text
                style={{
                  marginLeft: 10
                }}>
                19 Mayıs Caddesi 19 Mayıs Mahallesi
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10
              }}>
              <AntDesign name='clockcircleo' size={16} color='black' />
              <Text
                style={{
                  marginLeft: 10
                }}>
                Açık 07:00 - 21:00
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 10
              }}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <View style={styles.commentBox}>
                  <Text
                    style={{
                      marginRight: 10
                    }}>
                    Yorumlar
                  </Text>
                  <FontAwesome name='comments' size={24} color='black' />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <CommentBottomSheet refRBSheet={refRBSheet} />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                width: '100%',
                height: 100,
                overflow: 'hidden',
                borderRadius: 10,
                paddingTop: 10
              }}>
              <ScrollView>
                {restaurantData &&
                  restaurantData.items &&
                  restaurantData.items.map((food: any) => (
                    <RestaurantFoodCard key={food._id} food={food} />
                  ))}
              </ScrollView>
            </View>
          </View>
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
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4757',
    height: '10%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    zIndex: 100,
    top: 100,
    left: 0
  },
  rateBox: {
    height: 50,
    width: 50,
    borderRadius: 20,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goBackButton: {
    position: 'absolute',
    left: 10
  },
  restaurantHeader: {
    fontWeight: 'bold',
    fontSize: 28
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default RestaurantScreen;
