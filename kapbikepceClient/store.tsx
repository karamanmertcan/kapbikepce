import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { useEffect } from 'react';

interface UserState {}

export const storageItems = atom([]);
export const isAuthenticated = atom(false);
export const userState = atom({});
export const total = atom(0);

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
        console.log('token var');
      } else {
        console.log('token or user is null');
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

      // console.log('existItem', existItem);

      if (!existItem) {
        console.log('selam sepet');
        showMessage({
          message: 'Sepete Eklendi',
          type: 'success'
        });
        console.log(product);
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

    const filterItems = itemToParse.filter((item: any) => item._id !== product._id);
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
    // console.log('baketojson =>', bakeToJson);
    set(total, totalPrice);
  }
);

export const decreaseQty = atom(
  () => '',
  async (get, set, product: any) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    const findItem = itemToParse.map((item: any) =>
      item.id === product.id
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
    console.log(totalPrice);
    set(total, totalPrice);
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

    const totalPrice = itemToParse.reduce(
      (acc: any, cur: { quantity: number; price: number }) => acc + cur.price * cur.quantity,
      0
    );

    set(storageItems, findItem);
    set(total, totalPrice);

    set(storageItems, findItem);
    await AsyncStorage.setItem('cart', JSON.stringify(findItem));
  }
);
