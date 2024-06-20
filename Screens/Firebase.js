import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";

class Firebase {
    static getBikesData = async () => {
        const firebaseConfig = {
            apiKey: "AIzaSyAxCGBLU9IB0SD7pBcoCklRkFvNBovPWQg",
            authDomain: "ecoride1-63bb7.firebaseapp.com",
            databaseURL: "https://ecoride1-63bb7-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "ecoride1-63bb7",
            storageBucket: "ecoride1-63bb7.appspot.com",
            messagingSenderId: "130466368400",
            appId: "1:130466368400:web:998e77f7e17b234b05c115"
        };

        const app = initializeApp(firebaseConfig);
        const dbRef = ref(getDatabase());

        try {
            const snapshot = await get(child(dbRef, `/`));
            if (snapshot.exists()) {
                console.log(snapshot.val());
                return snapshot.val();
            } else {
                console.log("No data available");
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error to be caught by the caller
        }
    }
    static setBooked = async () => {
        const firebaseConfig = {
            apiKey: "AIzaSyAxCGBLU9IB0SD7pBcoCklRkFvNBovPWQg",
            authDomain: "ecoride1-63bb7.firebaseapp.com",
            databaseURL: "https://ecoride1-63bb7-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "ecoride1-63bb7",
            storageBucket: "ecoride1-63bb7.appspot.com",
            messagingSenderId: "130466368400",
            appId: "1:130466368400:web:998e77f7e17b234b05c115"
        };

        const app = initializeApp(firebaseConfig);
        const dbRef = ref(getDatabase());

        try {
            const snapshot = await get(child(dbRef, '/'));
            if (snapshot.exists()) {
                let bikeData = snapshot.val();
                console.log(bikeData.sensors.booked);
                // Update the booked value to 1
                await update(child(dbRef, '/sensors/booked'), 1);
                return snapshot.val();
            } else {
                console.log("No data available");
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error to be caught by the caller
        }
    };
}

export { Firebase };