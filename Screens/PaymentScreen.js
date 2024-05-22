import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Card from '../Components/Card';
import Input from '../Components/Input';
import tw, { style } from 'twrnc';
import Touchable from '../Components/Touchable'
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import Helpers from '../Configs/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageLoader from '../Components/PageLoader';

const PaymentScreen = ({ navigation }) =>{
    const [showCash, setShowCash] = useState(false);
    const [amount, setAmount] = useState('');
    const { confirmPayment } = useStripe();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const handlePayPress = async () => {
      try{
      setIsLoading(true);
      let userData = await AsyncStorage.getItem('user');
      let id = JSON.parse(userData)._id;
      const response = await fetch(`${Helpers.apiUrl}payement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          amount: parseInt(amount) * 100,
          currency: 'usd',
        }),
      });

      const { clientSecret, user } = await response.json();
  
      // Confirm the payment with the card details
      const { error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        type: 'Card',
        billingDetails: {
          email: JSON.parse(userData).email,
        },
      });
  
      if (error) {
        setIsLoading(false);
        console.log('Payment confirmation error', error);
      } else {
        setIsLoading(false);
        console.log('Payment successful!');
        Helpers.showToast("success", "Payement Successfull")
        Helpers.setData('user', user, true);
        setUser(user);
        navigation.navigate("Home");
      }
    }catch (error){
      setIsLoading(false);
      console.log(error)
    }
    };  

    const handleShowCash = () => {
        setShowCash(true);
    }

    const getUser = async () => {
      let userData = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userData));
    }

    useEffect(()=>{
      getUser();
    }, [])
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {isLoading && (<PageLoader />)}
        <Text style={tw`text-xl mt-3 text-gray-700 font-bold text-center`}>Payment Screen</Text>
        <View style={styles.flex}>
            <Card cardClass='w-100 p-2'>
                <Text 
                style={`text-xl py-10 font-medium text-gray-900 dark:text-white`}>
                Your current Balance is:</Text>
                <Touchable
                text={showCash ? user.accBalance : 'Click to show cash'}
                onPress={handleShowCash}
                ></Touchable>
            </Card>
        </View>
        <Text style={tw`text-xl mt-3 text-gray-700 font-bold text-center`}>Add Amount</Text>
        <View style={styles.container}>
          <Card>
          <TextInput
            style={tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Amount"
            keyboardType="numeric"
            onChangeText={setAmount}
            value={amount}
          />
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={tw`bg-gray-50 border border-gray-300 rounded-2`}
            style={styles.cardContainer}
          />
          <Button style={styles.paybtn} 
          onPress={handlePayPress} title="Pay" />
          </Card>
        </View>

        <Footer navigation={navigation}></Footer>
      </View>
    </View>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  container: {
    height: "100%",
    width: "100%",
  },
  flex: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  paybtn: {
    backgroundColor: "#7ac138"
  }
});