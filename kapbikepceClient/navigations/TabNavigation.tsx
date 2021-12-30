import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StackScreen from '../navigations/StackScreen';
import { NavigationContainer } from '@react-navigation/native';
import RestaurantScreen from '../screens/RestaurantScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';
import { useAtom } from 'jotai';
import { storageItems } from '../store';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Siparis'
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Kap Bi Kepçe'
        }}
      />
      <Stack.Screen
        name='RestaurantDetails'
        component={RestaurantScreen}
        options={{
          headerShown: false,
          title: 'Kap Bi Kepçe'
        }}
      />
      <Stack.Screen
        name='FoodDetailsScreen'
        component={FoodDetailsScreen}
        options={{
          headerShown: false,
          title: 'Kap Bi Kepçe'
        }}
      />
    </Stack.Navigator>
  );
}

export default function TabNavigation() {
  const [cartItems] = useAtom(storageItems);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ff4757'
        },
        tabBarHideOnKeyboard: true,

        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff'
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Ionicons name='ios-home' size={size} color={color} />
        }}
      />
      <Tab.Screen
        name='Kepçem'
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarBadge: cartItems.length,
          tabBarIcon: ({ size, color }) => <Entypo name='shopping-basket' size={24} color='white' />
        }}
      />
      <Tab.Screen
        name='Hesabım'
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <AntDesign name='user' size={24} color='white' />
        }}
      />
    </Tab.Navigator>
  );
}
