import { Toast } from 'toastify-react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

class Helpers {
    static localhost = 'http://13.60.28.134:3000';
    static server = '';
    static apiUrl = `${this.localhost}/api/`

    static setData = async (key, value, string) => {
      try {
        if(string){
          value = JSON.stringify(value);
        }
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error('Error saving data:', error);
        Alert.alert('Error', 'Failed to save data');
      }
    };

    static getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value;
      } catch (error) {
        console.error('Error loading data:', error);
        Alert.alert('Error', 'Failed to load data');
      }
    };

    static showToast = (type, message) => {
        switch (type) {
          case 'success':
            Toast.success(message);
            break;
          case 'error':
            Toast.error(message);
            break;
          case 'info':
            Toast.info(message);
            break;
          default:
            break;
        }
      };
}

export default Helpers;