import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { useAtom } from 'jotai';
interface UserState {}

axios.defaults.baseURL = 'http://kapbirkepce.herokuapp.com/api';

export const storageItems = atom([]);
export const isAuthenticated = atom(false);
export const userState = atom<any>({});
export const total = atom(0);
export const myToken = atom('');

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
        set(userState, {
          user: bakeToJsonUser,
          token: bakeToJsonToken
        });
        set(myToken, bakeToJsonToken);
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
        // console.log('user from storage', bakeToJsonUser);
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
      const existItem = itemToParse.find((item: any) => item._id === product._id);
      const differentRestaurantItem = itemToParse.every(
        (item: any) => item.restaurant !== product.restaurant
      );

      console.log('every different', differentRestaurantItem);
      console.log('farklı urun', differentRestaurantItem);

      if (differentRestaurantItem) {
        console.log('farklı urun var');
        showMessage({
          message: 'Farklı bir restorant sepete eklenemez',
          type: 'danger'
        });
        return false;
      }

      if (!existItem) {
        console.log('selam sepet');
        showMessage({
          message: 'Sepete Eklendi',
          type: 'success'
        });
        const jsonValue = JSON.stringify([...itemToParse, product]);
        await AsyncStorage.setItem('cart', jsonValue);

        console.log('local storage is not available');
        set(storageItems, [...itemToParse, product]);
      } else {
        showMessage({
          message: 'Ürün Daha Önce Sepete Eklendi',
          type: 'danger'
        });

        // console.log('exist item', existItem);
      }
    } else {
      console.log('newcart');
      showMessage({
        message: 'Sepete Eklendi',
        type: 'success'
      });
      const newCartItems = [product];

      await AsyncStorage.setItem('cart', JSON.stringify(newCartItems));
      set(storageItems, newCartItems);
    }
  }
);

export const removeFromCart = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    const filterItems = itemToParse.filter((item: any) => item._id !== product._id);
    set(storageItems, filterItems);
    await AsyncStorage.setItem('cart', JSON.stringify(filterItems));
  }
);

export const getItemsFromStorage = atom(
  () => '',
  async (get, set) => {
    const value = await AsyncStorage.getItem('cart');
    const bakeToJson = JSON.parse(value || '{}');
    const totalPrice = bakeToJson.reduce(
      (
        acc: any,
        cur: {
          price: number;
          quantity: number;
        }
      ) => acc + cur.price * cur.quantity,
      0
    );

    set(storageItems, bakeToJson);
    set(total, totalPrice);
  }
);

export const decreaseQty = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    const findItem = itemToParse.map((item: any) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity > 1 ? (item.quantity -= 1) : 1 }
        : item
    );

    const getItems = get(storageItems);
    const totalPrice = itemToParse.reduce(
      (acc: any, cur: any) => acc + cur.price * cur.quantity,
      0
    );

    set(storageItems, findItem);
    set(total, totalPrice);

    await AsyncStorage.setItem('cart', JSON.stringify(findItem));
  }
);

export const calculateCartTotal = atom(
  () => '',
  async (get, set) => {
    const getItems = get(storageItems);
    const totalPrice = getItems.reduce(
      (acc, cur: { price: number; quantity: number }) => acc + cur.price * cur.quantity,
      0
    );
    set(total, totalPrice);
  }
);

export const increaseQty = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    const findItem = itemToParse.map((item: any) =>
      item._id === product._id ? { ...item, quantity: (item.quantity += 1) } : item
    );

    const totalPrice = itemToParse.reduce(
      (acc: any, cur: { quantity: number; price: number }) => acc + cur.price * cur.quantity,
      0
    );

    set(storageItems, findItem);
    set(total, totalPrice);

    await AsyncStorage.setItem('cart', JSON.stringify(findItem));
  }
);
