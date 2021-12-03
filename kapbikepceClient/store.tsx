import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageItems = atom([]);

export const addItemToCart = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    if (getItemsFromLocal !== null && itemToParse.length >= 1) {
      const existItem = itemToParse.find((item: any) => item.id === product.id);
      if (!existItem) {
        const jsonValue = JSON.stringify([...itemToParse, product]);
        await AsyncStorage.setItem('cart', jsonValue);
        console.log('local storage is not available');
      }
    } else {
      const newCartItems = [product];
      console.log('newCartItems', newCartItems);

      await AsyncStorage.setItem('cart', JSON.stringify(newCartItems));
    }
  }
);

export const removeFromCart = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    const filterItems = itemToParse.filter((item: any) => item.id !== product.id);
    console.log('filter items =>', filterItems);
    set(storageItems, filterItems);
    await AsyncStorage.setItem('cart', JSON.stringify(filterItems));
  }
);

export const getItemsFromStorage = atom(
  () => '',
  async (get, set) => {
    const value = await AsyncStorage.getItem('cart');
    const bakeToJson = JSON.parse(value || '{}');
    console.log(bakeToJson);
    set(storageItems, bakeToJson);
    console.log('baketojson =>', bakeToJson);
  }
);
