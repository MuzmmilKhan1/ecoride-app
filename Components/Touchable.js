import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Touchable = ({Children, touchableStyles, onPress, text='', isIcon,
icon,iconSize=30, color="#36454f", iconText=""}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.5} // Adjust the opacity as needed for the touch effect
      style={touchableStyles === '' ?
      "bg-blue-500 rounded-md p-4" :
      `${touchableStyles}`}
    >
      { !(isIcon) && (
        <Text style={`text-${color} text-center`}>{text}</Text>
      )}
      { (isIcon) && (
      <View style={styles.IconP}>
      <Icon name={icon} size={iconSize} color={color} ></Icon>
      <Text style={`text-${color} text-center`}>{iconText}</Text>
      </View>)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  IconP: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Touchable;