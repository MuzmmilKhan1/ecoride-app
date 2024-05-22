import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Helpers from '../Configs/Helpers'; // Assuming you have a Helpers module for accessing app data

const Authenticated = ({ navigation, children }) => {
    useEffect(() => {
      checkUserAuthentication();
    }, []);
  
    const checkUserAuthentication = async () => {
      try {
        const userData = await Helpers.getData('user');
        if (userData) {
          navigation.navigate('HomeScreen'); // Use navigation prop to navigate
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
      }
    };
  };  

export default Authenticated;
