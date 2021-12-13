import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage, hideMessage } from 'react-native-flash-message';

interface UserState {}

export const storageItems = atom([]);
export const isAuthenticated = atom(false);
export const userState = atom({});

export const getTokenAndUserFromStorage = atom(
  () => '',
  async (get, set) => {
    try {
      const token: any = await AsyncStorage.getItem('token');
      const user: any = await AsyncStorage.getItem('user');

      const bakeToJsonUser = user && JSON.parse(user);
      const bakeToJsonToken = token && JSON.parse(token);

      if (bakeToJsonToken && bakeToJsonUser) {
        set(isAuthenticated, true);
        set(userState, bakeToJsonUser);
      } else {
        set(isAuthenticated, false);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserFromStorage = atom(
  () => '',
  async (get, set) => {
    try {
      const user: any = await AsyncStorage.getItem('user');

      const bakeToJsonUser = user && JSON.parse(user);

      if (bakeToJsonUser) {
        set(userState, bakeToJsonUser);
        console.log('user from storage', bakeToJsonUser);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutUser = atom(
  () => '',
  async (get, set) => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      set(isAuthenticated, false);
      set(userState, {});
    } catch (error) {
      console.log(error);
    }
  }
);

export const addItemToCart = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);
    Object.assign(product, { quantity: 1 });

    if (getItemsFromLocal !== null && itemToParse.length >= 1) {
      const existItem = itemToParse.find((item: any) => item.id === product.id);

      // console.log('existItem', existItem);

      if (!existItem) {
        console.log('selam sepet');
        showMessage({
          message: 'Sepete Eklendi',
          type: 'success'
        });
        const jsonValue = JSON.stringify([...itemToParse, product]);
        await AsyncStorage.setItem('cart', jsonValue);

        // console.log('local storage is not available');
      } else {
        showMessage({
          message: 'Ürün Daha Önce Sepete Eklendi',
          type: 'default'
        });

        // console.log('exist item', existItem);
      }
    } else {
      // console.log('selam sepet else');
      showMessage({
        message: 'Sepete Eklendi',
        type: 'success'
      });
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
    // console.log(bakeToJson);
    set(storageItems, bakeToJson);
    // console.log('baketojson =>', bakeToJson);
  }
);

export const decreaseQty = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    const findItem = itemToParse.map((item: any) =>
      item.id === product.id ? { ...item, quantity: (item.quantity -= 1) } : item
    );

    set(storageItems, findItem);
    await AsyncStorage.setItem('cart', JSON.stringify(findItem));
  }
);

export const increaseQty = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    const findItem = itemToParse.map((item: any) =>
      item.id === product.id ? { ...item, quantity: (item.quantity += 1) } : item
    );

    set(storageItems, findItem);
    await AsyncStorage.setItem('cart', JSON.stringify(findItem));
  }
);
