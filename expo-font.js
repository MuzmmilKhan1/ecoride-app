import { Font } from 'expo';

export const loadFonts = async () => {
  await Font.loadAsync({
    Poppins: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    // Add other font weights if you downloaded them
    // PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    // PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });
};
