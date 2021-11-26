import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TabNavigation from '../navigations/TabNavigation';

const Stack = createNativeStackNavigator();

function StackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
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
        /> */}
        {/* <Stack.Screen
          name='Intro'
          component={IntroSlider}
          options={{
            headerShown: false
          }}
        /> */}
        <Stack.Screen
          name='TabBar'
          component={TabNavigation}
          options={{
            headerShown: false
            // headerStyle: {
            //   backgroundColor: '#ff4757'
            // },
            // headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
            title: 'Kap Bi Kepçe'
            // headerStyle: {
            //   backgroundColor: '#ff4757'
            // },
            // headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackScreen;
