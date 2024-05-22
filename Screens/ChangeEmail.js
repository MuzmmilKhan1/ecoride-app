import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BackendRequest } from '../Components/BackendRequest';
import Helpers from '../Configs/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangeEmail = ({ navigation }) => {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleChangeEmail = async () => {
    try {
        let userData = await AsyncStorage.getItem('user');
        let id = JSON.parse(userData)._id;
        const emails = {
            id: id,
            oldEmail: oldEmail,
            newEmail: newEmail
        }
        const response = await BackendRequest.sendRequest(`${Helpers.apiUrl}users/change-email`, 'post', {}, emails);
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
      <Text style={styles.heading}>Change Email</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={oldEmail}
          onChangeText={setOldEmail}
          placeholder="Old Email"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="New Email"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleChangeEmail}
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

export default ChangeEmail;
