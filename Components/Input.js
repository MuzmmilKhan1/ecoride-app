import React from 'react'
import { View, Text, TextInput } from 'react-native';
import tw from 'twrnc';

export default function Input({ label = "Value", labelClass = '', value, onChange, 
  type = "text", maxLength = 15, placeholder = "Enter Value", InputClass = ''}) {
  return (
    <View>
    <Text style={tw`${labelClass === '' ? 
    "mb-2 text-sm font-medium text-gray-900 dark:text-white"
    : `${labelClass}`}`}>{label}</Text>
    <TextInput
      style={tw`${ InputClass === '' ? 
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
        :`${InputClass}`}`}
      placeholder={placeholder}
      value={value}        
      onChangeText={onChange}
      keyboardType={type}
      maxLength={maxLength}
    />
  </View>
  )
}
