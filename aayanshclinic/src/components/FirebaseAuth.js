import * as firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBhVndpU95bMbKlKeu4y81GwiEtCRYpFaQ",
    authDomain: "aayansh-clinic.firebaseapp.com",
    projectId: "aayansh-clinic",
    storageBucket: "aayansh-clinic.appspot.com",
    messagingSenderId: "666831574732",
    appId: "1:666831574732:web:7c3cd99e6c1db410919469",
    measurementId: "G-YMEF4H8RCJ"
 });

export const db = firebase.firestore(app);
export const storage = firebase.storage(app);
export default app;