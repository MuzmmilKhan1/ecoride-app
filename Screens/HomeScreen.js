import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Mapbox, { Camera, MapView, PointAnnotation } from "@rnmapbox/maps";
import Footer from './Footer';
import Card from '../Components/Card';
import Input from '../Components/Input';
import * as Location from 'expo-location';
import Touchable from '../Components/Touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Firebase } from './Firebase';
import MyButton from '../Components/Button';
import { BackendRequest } from '../Components/BackendRequest';
import Helpers from '../Configs/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

Mapbox.setAccessToken('pk.eyJ1IjoiYWJkdWxsYWgwMTQzMDUiLCJhIjoiY2x2Y210OHI0MGxoNzJxcGJxZmtlcmtpbSJ9.cKU8HFx35fVtAvjC9rg0Zg');

const defaultEBike = {
  code: '',
  label: ''
}

const App = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [bikeDetails, setBikeDetails] = useState(defaultEBike);
  const [showModel, setShowModel] = useState(false);
  const [bike, setBikes] = useState([]);
  const [bookBtn, setBookBtn] = useState(false);
  const [checkHelmet, setCheckHelmet] = useState(0)
  const [stations, setStations] = useState([]);

  const handleModelToggle = () => {
    setShowModel(!showModel);
  }

  const getStation = async () => {
    // /api/stations/getstations
    try{
      console.log("getting stations")
      const response = await BackendRequest.sendRequest(`${Helpers.apiUrl}stations/getstations`, 'get', {}, {});
      console.log(response.data);
      setStations(response.data.allstations)
    }catch(error){
      console.log(error);
    }
  }

  const getData = async () => {
    try {
        const bikeData = await Firebase.getBikesData();
        return bikeData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const book = async () => {
  let userData = await AsyncStorage.getItem('user');
  if(JSON.parse(userData).accBalance <= 0){
    Helpers.showToast("info", 'Please Recharge')
    return;
  }
  if(bike.sensors.fsr === 1){
    navigation.navigate('Booked')
  }else{
    Helpers.showToast("info", "Please wear Helmet")
    setCheckHelmet(checkHelmet + 1)
  }
}

useEffect(() => {
    (async () => {
      let data = await getData();
      console.log(data);
      setBikes(data);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      // Watch for location changes
      let locationSubscription = await Location.watchPositionAsync({}, (location) => {
        setLocation(location);
      });
  
      // Cleanup function to unsubscribe from location updates when component unmounts
      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, [checkHelmet]);

  useEffect(()=>{
    getStation();
  }, [])
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Card cardClass="absolute top-10 left-0 z-10 bg-transparent w-full">
          <Input 
          label='E-Bike Code: '
          placeholder='Enter E-Bike Code'
          value={bikeDetails.code}
          onChange={(newValue)=>{
            setBikeDetails({...bikeDetails, code: newValue})
            if(newValue === '8919'){
              setBookBtn(true);
            }
          }}/>
          {/* <Input 
          label='E-Bike Label: ' 
          placeholder='Enter E-Bike Label'
          value={bikeDetails.label}
          onChange={(newValue)=>setBikeDetails({...bikeDetails, label: newValue})}/> */}
          {bookBtn && (
            <MyButton
            title={'Book Now'}
            onPress={()=>book()}
            BtnStyles={'bg-green-500 py-2 mt-2 flex items-center text-white rounded-xl'}
            ></MyButton>
          )}
          </Card>
        {location !== null && (<MapView 
        style={styles.map} 
        scaleBarEnabled={false}
        rotateEnabled={true}
        styleURL='mapbox://styles/mapbox/streets-v12'
        >
          <Camera
          zoomLevel={15}
          centerCoordinate={[location?.coords.longitude,location?.coords.latitude]}
          animationMode='flyTo'
          animationDuration={3000}
          />
          <PointAnnotation
          id="tag"
          coordinate={[location?.coords.longitude,location?.coords.latitude]}
          >
            <View>
              <Touchable
              isIcon={true}
              icon={'map-pin'}>
              </Touchable>
            </View>
          </PointAnnotation>
          <PointAnnotation
          id="tag"
          coordinate={[bike?.location.longitude,bike?.location.latitude]}
          onSelected={()=>setBookBtn(true)}
          onDeselected={()=>setBookBtn(true)}
          >
            <View
            style={styles.transparent}
            >
              <Icon
              name={'motorbike-electric'}
              size={30}
              color={'#36454f'}
              >
              </Icon>
            </View>
          </PointAnnotation>
          {stations.map((e, index)=>{
            return(
              <PointAnnotation
              key={index}
              id={`tag ${index}`}
              coordinate={[e.longitude,e.latitude]}
              >
                <View
                style={styles.transparent}
                >
                  <Touchable
                  isIcon={true}
                  icon={'charging-station'}>
                  </Touchable>
                </View>
              </PointAnnotation>
            )
          })}
        </MapView>)}

        <Footer navigation={navigation}></Footer>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1
  },
  transparent: {
    backgroundColor: "transparent"
  }
});