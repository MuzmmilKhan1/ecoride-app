import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Footer from './Footer';
import Card from '../Components/Card';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Helpers from '../Configs/Helpers';
import { BackendRequest } from '../Components/BackendRequest';

export default function AccountSetting({ navigation }) {
  const [user, setUser] = useState({});

  const getUser = async () => {
    let userData = await AsyncStorage.getItem('user');
    let user = JSON.parse(userData);
    setUser(user);
  }

  const deleteAccount = async () => {
    try {
        let userData = await AsyncStorage.getItem('user');
        let id = JSON.parse(userData)._id;
        const details = {
            id: id
        }
        const response = await BackendRequest.sendRequest(`${Helpers.apiUrl}users/delete-account`, 'post', {}, details);
        console.log('Data: ', response.data);
        Helpers.showToast("success", response.data.message);
        Logout();
      } catch (error) {
        console.error("error: ", error);
        Helpers.showToast('error', error.response.data.message)
        // Handle the error here
      }
  };

  const Logout = () => {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('token');
    navigation.navigate('/');
  }

  useEffect(()=>{
    getUser();
  }, [])
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Card cardClass='w-[100%] px-5 pt-20 mb-0 pb-0' bg='#ffffff' cardBg='#f69434'>
            <View style={tw`flex flex-row justify-center items-center p-2 m-2`}>
                <View style={tw`w-[30%]`}>
                    <Image
                    source={require('../assets/dollar.png')}
                    resizeMode='contain'
                    style={{ width: 50, height: 50 }}></Image>
                </View>
                <View style={tw`w-[70%]`}>
                  <Text style={[tw`text-white`, styles.email]}>{user.email}</Text>
                  <Text style={[tw`text-white font-semibold`, styles.balance]}>
                    Balance: Rs {user.accBalance ? user.accBalance.toFixed(0) : '0.00'}/-
                  </Text>
                </View>
            </View>
        </Card>

        <View style={[tw`px-5`,styles.containerSettings]}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('ChangeEmail')}
          >
            <Text style={styles.optionText}>Change Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('ChangePhoneNumber')}
          >
            <Text style={styles.optionText}>Change Phone Number</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => deleteAccount()}
          >
            <Text style={styles.optionText}>Delete My Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => Logout()}
          >
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
          
        </View>

        <Footer navigation={navigation}></Footer>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    container: {
      height: "100%",
      width: "100%",
    },
    email: {
      color: '#ffffff',
      fontFamily: 'Poppins',
    },
    balance: {
      color: '#ffffff',
      fontWeight: "900",
      fontFamily: "Poppins",
      fontSize: 18
    },
    containerSettings: {
      flex: 1,
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    option: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    optionText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });