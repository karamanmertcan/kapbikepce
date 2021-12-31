import * as React from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItemsFromStorage, storageItems, calculateCartTotal, total } from '../store';
import Header from '../components/Header';
import FoodCartItem from '../components/cart/FoodCartItem';
import RestaurantFoodCard from '../components/RestaurantFoodCard';
import { useAtom } from 'jotai';
import MyStatusBar from '../components/statusbar/StatusBarComp';

interface ICartScreenProps {}

const IsCartEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold'
        }}>
        Kepçende Ürün Yok
      </Text>
      <View>
        <Entypo name='emoji-sad' size={44} color='black' />
      </View>
    </View>
  );
};

const CartScreen: React.FunctionComponent<ICartScreenProps> = (props) => {
  const [storageItem, setStorageItem] = useAtom(storageItems);
  const [storeItems, setStoreItems] = useAtom(getItemsFromStorage);
  const [totalCart, setTotalCart] = useAtom(calculateCartTotal);
  const [price, setPrice] = useAtom(total);
  const [totalPriceOfCart, setTotalPriceOfCart] = React.useState(0);
  const [arrayStoreItems, setArrayStoreItems] = React.useState(storageItem);
  const route = useRoute();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      setStoreItems();
    }
    setTotalCart();
  }, [props, isFocused, arrayStoreItems]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
      <MyStatusBar backgroundColor='#ff4757' barStyle='light-content' />

      <View style={styles.container}>
        <Header />
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Kepçem</Text>
        </View>
        {storageItem.length > 0 ? (
          <View style={styles.foodCartContainer}>
            <ScrollView>
              {storageItem &&
                storageItem.length > 0 &&
                storageItem.map((item: any) => <FoodCartItem key={item._id} item={item} />)}
            </ScrollView>
            <View style={styles.priceContainer}>
              <View style={styles.priceContainerLeft}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('ödeme');
                  }}>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text
                      style={{
                        fontSize: 24,
                        color: '#fff'
                      }}>
                      Ödeme
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.priceContainerRight}>
                <Text>₺ {price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ) : (
          <IsCartEmpty />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  foodCartContainer: {
    flex: 1,
    padding: 20
  },
  titleContainer: {
    width: '100%',
    padding: 20
  },
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 26
  },
  priceContainer: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden'
  },
  priceContainerLeft: {
    flex: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4757'
  },
  priceContainerRight: {
    flex: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1'
  }
});

export default CartScreen;
