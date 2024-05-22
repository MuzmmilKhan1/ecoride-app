import { useState, useEffect } from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

// Screens
import HomeScreen from './Screens/HomeScreen';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import WelcomeScreen from './Screens/WelcomeScreen';
import PaymentScreen from './Screens/PaymentScreen';
import Book from './Screens/Book';

// Toast
import ToastManager from 'toastify-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Components
import Helpers from './Configs/Helpers';
import { BookingProvider } from './Context/BookContext';
import AccountSetting from './Screens/AccountSetting';
import { loadFonts } from './expo-font';
import ChangeEmail from './Screens/ChangeEmail';
import ChangePassword from './Screens/ChangePassword';
import ChangePhoneNumber from './Screens/ChangePhoneNumber';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(()=>{
    loadFonts();
  }, [])
  return (
    <StripeProvider
    publishableKey='pk_test_51Of0LpKDP52BYTYxWwUCzLvfCo67FANYIyavru2i87PwCdqh2t2phT5SVLf4SxgPWIkSs9KkeVgwa8sERf1vxXDG00YO5EaLO8'
    >
    <BookingProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName={`/`}>
            <Stack.Screen
              name={`/`}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Signup'
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Payment'
              component={PaymentScreen}
              options={{ headerShown: false }}
              />
            <Stack.Screen
              name='Booked'
              component={Book}
              options={{ headerShown: false }}
            />
            <Stack.Screen
            name='settings'
            component={AccountSetting}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name='ChangeEmail'
            component={ChangeEmail}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name='ChangePassword'
            component={ChangePassword}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name='ChangePhoneNumber'
            component={ChangePhoneNumber}
            options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <ToastManager/>
      </NavigationContainer>
    </BookingProvider>
    </StripeProvider>
  );
}