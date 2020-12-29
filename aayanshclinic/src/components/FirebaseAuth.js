import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBhVndpU95bMbKlKeu4y81GwiEtCRYpFaQ",
    authDomain: "aayansh-clinic.firebaseapp.com",
    databaseURL: "https://aayansh-clinic.firebaseio.com",
    projectId: "aayansh-clinic",
    storageBucket: "aayansh-clinic.appspot.com",
    messagingSenderId: "666831574732",
    appId: "1:666831574732:web:7c3cd99e6c1db410919469",
    measurementId: "G-YMEF4H8RCJ"
 });

export const db = app.firestore();
//export const storage = app.storage();
export const firebaseAuth = app.auth();
export default app;