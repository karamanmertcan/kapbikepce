import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { decreaseQty, increaseQty, addItemToCart } from '../store';
import { useAtom } from 'jotai';

interface IFoodDetailsScreenProps {
  route: {
    params: {
      itemId: number;
    };
  };
}

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

const FoodDetailsScreen: React.FunctionComponent<IFoodDetailsScreenProps> = (props) => {
  const [productData, setProductData] = useState<FakeStoreApi>({} as FakeStoreApi);
  const [, setDecreaseItemQty] = useAtom(decreaseQty);
  const [, setIncreaseItemQty] = useAtom(increaseQty);
  const [, setAddToCart] = useAtom(addItemToCart);

  const getSingleProduct = async () => {
    const { data } = await axios.get<FakeStoreApi>(
      `https://fakestoreapi.com/products/${props.route.params.itemId}`
    );
    setProductData(data);
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={{ width: '100%', height: 200 }}
              resizeMode='contain'
              source={{
                uri: `${productData?.image}`
              }}
            />
          </View>
          <View style={styles.productTitle}>
            <Text style={styles.productTitleText}>{productData?.title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{productData?.description}</Text>
          </View>
          <View style={styles.priceAndButtons}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold'
              }}>
              {productData?.price} TL
            </Text>
          </View>
          <View style={styles.addToCartButton}>
            <Button
              mode='contained'
              color='#ff4757'
              onPress={() => setAddToCart(productData)}
              style={{
                width: '100%',
                height: '100%'
              }}>
              Kepçele
            </Button>
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
  imageContainer: {
    marginTop: '20%',
    width: '100%',
    height: 200
  },
  productTitle: {
    width: '90%',
    padding: 20,
    margin: '5%'
  },
  productTitleText: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  descriptionContainer: {
    width: '90%',
    margin: '5%'
  },
  descriptionText: {
    fontSize: 16
  },
  priceAndButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    margin: '5%'
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginHorizontal: '25%',
    borderRadius: 10
  }
});

export default FoodDetailsScreen;
