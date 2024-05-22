import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import tw, { style } from 'twrnc';

const MyButton = ({ onPress, title, BtnStyles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`${BtnStyles}`}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MyButton;
