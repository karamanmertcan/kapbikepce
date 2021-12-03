import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StackScreen from '../navigations/StackScreen';
import { NavigationContainer } from '@react-navigation/native';
import RestaurantScreen from '../screens/RestaurantScreen';
import CartScreen from '../screens/CartScreen';

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

          tabBarActiveTintColor: '#fff'
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
              <Ionicons name='ios-cart-outline' size={24} color='black' />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
