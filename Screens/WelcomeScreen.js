import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import tw, { style } from 'twrnc';
import Helpers from '../Configs/Helpers';
import { BackendRequest } from '../Components/BackendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen({ navigation }) {
  const [route, setRoute] = useState(false);

  const requestUserDetails = async () => {
    try {
      const userData = await Helpers.getData('user');
      if (userData == 'null') {
        console.log("USer is null")
        return;
      }    
      const response = await BackendRequest.sendRequest(`${Helpers.apiUrl}users/details`,
      'post',
      {},
      {id: JSON.parse(userData)._id}
      );
      console.log('Data: ', response.data);
      Helpers.setData('user', response.data.user, true);
    } catch (error) {
      console.error("error: ", error);
      Helpers.showToast('error', error.response.data.message)
    }
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const userData = await Helpers.getData('user');
        if(userData == 'null'){
          AsyncStorage.removeItem('user');
          return;
        }
        if (userData) {
          setRoute(true)
          console.log("User Found");
        } else {
          setRoute(false)
          console.log("User Not Found");
        }
      } catch (error) {
        setRoute(false)
        console.log("Error finding User");
      }
    };

    checkUserAuthentication();
    requestUserDetails();
  }, []);
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('../assets/graph-1.png')}
        style={styles.topImage}
      />
      
      <View style={styles.container}>
        <Image
          source={require('../assets/icon.png')}
          style={styles.mainImage}
        />

            {!route ? (<>
            <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate('Login')}>
              <Text style={tw`text-black-700 rounded text-lg font-semibold border-2 border-black w-25 text-center my-1`}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate('Signup')}>
              <Text style={tw`bg-black text-white rounded text-lg font-semibold border-2 border-black w-25 text-center my-1`}>
                Sign Up
              </Text>
            </TouchableOpacity>
            </>
          ):
          (<TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate('Home')}>
          <Text style={tw`text-black-700 rounded text-lg font-semibold border-2 border-black w-25 text-center my-1`}>
            See Map
          </Text>
        </TouchableOpacity>)}
      </View>

      <Image
        source={require('../assets/graph-2.png')}
        style={styles.bottomImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    flex: 1, // Add this to ensure the wrapper fills the entire screen
  },
  topImage: {
    position: "absolute",
    top: -130,
    left: -250,
  },
  signIn: {
    top: -125,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  mainImage: {
    marginTop: 55,
    width: '100%',
    resizeMode: 'contain',
  },
  bottomImage: {
    position: "absolute",
    top: 500,
    left: 100,
  },
});
