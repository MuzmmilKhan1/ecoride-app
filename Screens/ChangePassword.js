import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Helpers from '../Configs/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackendRequest } from '../Components/BackendRequest';

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    try {
        if(password !== confirmPassword){
          Helpers.showToast('error', 'Get');
          return;
        }

        let userData = await AsyncStorage.getItem('user');
        let id = JSON.parse(userData)._id;

        const passwordData = {
            id: id,
            newPassword: password,
            confirmPassword: confirmPassword
        }

        const response = await BackendRequest.sendRequest(`${Helpers.apiUrl}users/change-password`, 'post', {}, passwordData);
        console.log('Data: ', response.data);
        Helpers.showToast("success", response.data.message);
        Helpers.setData('user', response.data.user, true);
        navigation.navigate('Home');
      } catch (error) {
        console.error("error: ", error);
        Helpers.showToast('error', error.response.data.message)
        // Handle the error here
      }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Change Password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#7ac138' }]}
        onPress={handleChangePassword}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: '#7ac138',
      paddingVertical: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

  export default ChangePassword;
  