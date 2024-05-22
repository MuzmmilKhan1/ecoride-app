import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Card from '../Components/Card';
import MyButton from '../Components/Button';
import { useBookingContext } from '../Context/BookContext';
import { BackendRequest } from '../Components/BackendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Helpers from '../Configs/Helpers';

const Book = ({ navigation }) => {
  const { timeStamp, setTimeStamp, price, totalAmount, setTotalAmount } = useBookingContext();
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeStamp(prevTimeStamp => prevTimeStamp + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const amount = (timeStamp / 60) * price;
    setTotalAmount(amount);
  }, [timeStamp, price]);

  // Format seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs < 10 ? '0' + hrs : hrs}:${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const deduct = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
      let id = JSON.parse(userData)._id;
      const response = await BackendRequest.sendRequest(
        `${Helpers.apiUrl}deduct`,
        'post',
        {},
        { id: id, total: totalAmount }
      );
      console.log(response.data);
      Helpers.showToast("success", "Thanks");
      Helpers.setData('user', response.data.user, true);
      stopAndReset();
    } catch (error) {
      console.log(error);
    }
  };

  const stopAndReset = () => {
    clearInterval(intervalRef.current);
    setTimeStamp(0);
    setTotalAmount(0);
  };

  return (
    <View style={styles.container}>
        <Card cardClass='w-[100%] px-2 py-5'>
            <View style={styles.row}>
                <Text style={styles.label}>Time</Text>
                <Text style={styles.value}>{formatTime(timeStamp)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Price</Text>
                {/* <Text style={styles.value}>{pricePerMinute}</Text> */}
                <Text style={styles.value}>15/-</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Total</Text>
                <Text style={styles.value}>{totalAmount.toFixed(0)}</Text>
            </View>
            <MyButton 
            title={'Calculate And Deduct'}
            onPress={()=>deduct()}
            BtnStyles={'bg-red-500 py-2 mt-2 flex items-center text-white rounded-xl'}></MyButton>
        </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: "100%"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  label: {
    width: '50%',
    textAlign: 'left',
  },
  value: {
    width: '50%',
    textAlign: 'right',
  },
});

export default Book;
