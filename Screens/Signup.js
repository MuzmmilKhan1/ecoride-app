import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import tw, { style } from 'twrnc';
import Helpers from '../Configs/Helpers';
import { BackendRequest } from '../Components/BackendRequest';
import axios from 'axios'

const defaultLoginCredentials = {
  cnic: "",
  password: "",
  confirm_password: "",
  phoneNumber: "",
  email: ""
}


const formatCNIC = (cnic) => {
  if (!cnic) return '';
  
  // Format the CNIC number with dashes
  let formattedCNIC = cnic.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  if (formattedCNIC.length > 5) {
    formattedCNIC = formattedCNIC.slice(0, 5) + '-' + formattedCNIC.slice(5);
  }
  if (formattedCNIC.length > 13) {
    formattedCNIC = formattedCNIC.slice(0, 13) + '-' + formattedCNIC.slice(13);
  }
  return formattedCNIC;
};


const Signup = ({ navigation }) => {
  const [user, setUser] = useState(defaultLoginCredentials);

  const handleSignup = () => {
    console.log(user)
    axios.post(`${Helpers.apiUrl}users/signup`, user)
      .then(response => {
          if (response.success) {
              console.log("Request successful:", response.data);
              Helpers.setData('user', response.data.user, true)
              Helpers.showToast('success', 'Logged In Successfully');
              navigation.navigate('Home')
          } else {
              console.error("Request failed:", response.error);
              Helpers.showToast('success', response.error);
          }
      })
      .catch(error => {
          console.error("Error sending request:", error);
          Helpers.showToast('success', error);
      });
  }
  return(
        <View style={tw`w-full h-full max-w-sm bg-[#eeeeee] p-2
                flex flex-col justify-center items-center`}>
        <View style={[tw`w-full p-6 m-6`, styles.card]}>
          <Text 
          style={tw`text-xl text-center py-4 font-medium text-gray-900 dark:text-white`}>
            Sign up to our platform</Text>
          <View>
            <Text style={tw`mb-2 text-sm font-medium text-gray-900 dark:text-white`}>CNIC</Text>
            <TextInput
              style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full`}
              placeholder="12345-1234567-1"
              value={formatCNIC(user.cnic)}
              onChangeText={(text) => {
                const filteredText = text.replace(/[^0-9]/g, '');
                setUser({ ...user, cnic: filteredText });
              }}
              keyboardType="numeric"
              maxLength={15}
            />
          </View>
          <View>
            <Text style={tw`mb-2 text-sm font-medium text-gray-900 dark:text-white`}>Password</Text>
            <TextInput
              style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg p-2.5 w-full`}
              placeholder="••••••••"
              secureTextEntry={true}
              value={user.password}
              onChangeText={(value)=>setUser({...user, password: value})}
              required
              maxLength={13}
            />
          </View>
          <View>
            <Text style={tw`mb-2 text-sm font-medium text-gray-900 dark:text-white`}>Confirm Password</Text>
            <TextInput
              style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg p-2.5 w-full`}
              placeholder="••••••••"
              secureTextEntry={true}
              value={user.confirm_password}
              onChangeText={(value)=>setUser({...user, confirm_password: value})}
              required
              maxLength={13}
            />
          </View>
          <View>
            <Text style={tw`mb-2 text-sm font-medium text-gray-900 dark:text-white`}>Phone Number</Text>
            <TextInput
              style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg p-2.5 w-full`}
              placeholder="+923*********"
              value={user.phoneNumber}
              onChangeText={(value)=>setUser({...user, phoneNumber: value})}
              required
            />
          </View>
          <View>
            <Text style={tw`mb-2 text-sm font-medium text-gray-900 dark:text-white`}>Email</Text>
            <TextInput
              style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg p-2.5 w-full`}
              placeholder="user@email.com"
              value={user.email}
              onChangeText={(value)=>setUser({...user, email: value})}
              required
            />
          </View>
          <TouchableOpacity
          onPress={handleSignup} 
          style={tw`w-full text-white bg-[#7ac138] p-4 my-4
          hover:bg-blue-800 focus:ring-4 focus:outline-none
           focus:ring-blue-300 font-medium rounded-lg text-sm 
           hover:border hover:border-[#7ac138] hover:text-white
            px-5 py-2.5 text-center`}>
            <Text style={tw`text-center text-white`}>Signup</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={tw`flex flex-row`}>
        <Text>Already Signed Up?</Text>
        <TouchableOpacity>
              <Text style={tw`text-blue-700 hover:underline dark:text-blue-500 text-center`}>Login</Text>
            </TouchableOpacity>
        </View> */}
      </View>
    )
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    borderWidth: 0,
    elevation: 10,
  },
  image:{
    width: 150,
    height: 150,
    resizeMode: 'contain'
  }
});

export default Signup;