import React from 'react'
import { View, StyleSheet, Image } from 'react-native';

export default function PageLoader() {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/kick-scooter.gif')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 25,  // This should be half of the width/height to make it circular if the image is square
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    }
});
