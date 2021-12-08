import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StackScreen from '../navigations/StackScreen';
import { NavigationContainer } from '@react-navigation/native';
import RestaurantScreen from '../screens/RestaurantScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#ff4757'
          },
          tabBarHideOnKeyboard: true,

          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff'
        }}>
        <Tab.Screen
          name='Sipariş'
          component={StackScreen}
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
            tabBarIcon: ({ size, color }) => (
              <Entypo name='shopping-basket' size={24} color='white' />
            )
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
    </NavigationContainer>
  );
}
