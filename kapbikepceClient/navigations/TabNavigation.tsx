import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import StackScreen from '../navigations/StackScreen';
import { NavigationContainer } from '@react-navigation/native';

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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
