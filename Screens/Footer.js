import React from 'react';
import { StyleSheet, View } from 'react-native';
import Touchable from '../Components/Touchable';
import Helpers from '../Configs/Helpers';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
        <Touchable 
        iconSize={25}
        icon={'map-location-dot'} 
        iconText={"Map"} 
        onPress={()=> navigation.navigate('Home')}
        isIcon={true}
        >
        </Touchable>
        <Touchable 
        iconSize={25}
        icon={'credit-card'} 
        iconText={"Payments"} 
        onPress={()=> navigation.navigate('Payment')}
        isIcon={true}
        >
        </Touchable>
        <Touchable
        iconSize={25} 
        icon={'user'} 
        iconText={"User"} 
        onPress={()=> navigation.navigate('settings')}
        isIcon={true}
        >
        </Touchable>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
    footer: {
        bottom: 0,
        position: "absolute",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "white",
        height: 60,
        padding: 5
    }
});