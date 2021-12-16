import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItemsFromStorage, storageItems } from '../store';
import Header from '../components/Header';
import FoodCartItem from '../components/cart/FoodCartItem';
import RestaurantFoodCard from '../components/RestaurantFoodCard';
import { useAtom } from 'jotai';

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
  const [storageItem, setStorageIte] = useAtom(storageItems);
  const [storeItems, setStoreItems] = useAtom(getItemsFromStorage);
  const route = useRoute();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      setStoreItems();
    }
  }, [props, isFocused]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff4757' }}>
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
  headerContainer: {}
});

export default CartScreen;
