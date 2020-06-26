import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../scenes/splash';
import LoginScreen from '../scenes/login';
import HomeScreen from '../scenes/home';
import AppColors from '../assets/colors';
const Stack = createStackNavigator();
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerStyle: styles.mainHeader,
          headerShown: false,
          headerLeft: () => <View />,
        }}
      />
    </Stack.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerBackImage: <Image />,
          headerLeft: <View />,
        }}
      />
      <Stack.Screen
        name="MainNavigation"
        component={MainStack}
        options={{
          headerShown: false,
          gestureEnabled: false,
          headerBackImage: <Image />,
          headerLeft: <View />,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  mainHeader: {
    backgroundColor: AppColors.barTintColor,
  },
});

export default MyStack;
