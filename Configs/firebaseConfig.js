import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAxCGBLU9IB0SD7pBcoCklRkFvNBovPWQg',
  authDomain: 'ecoride1-63bb7.firebaseapp.com',
  databaseURL: 'https://ecoride1-63bb7-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ecoride1-63bb7',
  storageBucket: 'ecoride1-63bb7.appspot.com',
  messagingSenderId: '130466368400',
  appId: '1:130466368400:android:2a347de5586fae3605c115',
//   measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase