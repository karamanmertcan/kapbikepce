import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAtom } from 'jotai';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigation from '../navigations/TabNavigation';
import RestaurantScreen from '../screens/RestaurantScreen';
import { isAuthenticated } from '../store';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';

const Stack = createNativeStackNavigator();

function StackScreen() {
  const [isAuthenticatedState] = useAtom(isAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticatedState ? (
          <>
            <Stack.Screen
              name='Tab'
              component={TabNavigation}
              options={{
                headerShown: false
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{
                headerShown: false
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreen;
