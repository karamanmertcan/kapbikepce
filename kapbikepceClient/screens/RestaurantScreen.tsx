import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  Button,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';

import Header from '../components/Header';
import RestaurantFoodCard from '../components/RestaurantFoodCard';
import CommentBottomSheet from '../components/comments/CommentBottomSheet';

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

const RestaurantScreen: React.FunctionComponent<IRestaurantScreenProps> = (props) => {
  const [product, setProducts] = React.useState<FakeStoreApi[]>([]);

  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation<any>();
  const route = useRoute();
  console.log(route.name);

  const getProductsFromApi = async () => {
    const data = await fetch('https://fakestoreapi.com/products');
    const res = await data.json();
    setProducts(res);
  };

  React.useEffect(() => {
    getProductsFromApi();
  }, []);

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
              uri: 'https://i.imgur.com/2ZZfFQb.jpeg'
            }}
          />
        </View>

        <View
          style={{
            flex: 4,
            padding: 20
          }}>
          <Text style={styles.restaurantHeader}>KapbiKepçe Restaurant</Text>
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
              <View
                style={{
                  flexDirection: 'row'
                }}>
                <FontAwesome name='star' size={16} color='gold' />
                <FontAwesome name='star' size={16} color='gold' />
                <FontAwesome name='star' size={16} color='gold' />
                <FontAwesome name='star-half-empty' size={16} color='gold' />
                <Text
                  style={{
                    marginLeft: 10
                  }}>
                  (3.5) - 1221 Yorum
                </Text>
              </View>
              <View>
                <CommentBottomSheet />
              </View>
              <View></View>
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
                {product &&
                  product.map((product) => (
                    <RestaurantFoodCard key={product.id} product={product} />
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
    top: 0,
    left: 0
  },
  goBackButton: {
    position: 'absolute',
    left: 10
  },
  restaurantHeader: {
    fontWeight: 'bold',
    fontSize: 28
  }
});

export default RestaurantScreen;
