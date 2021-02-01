import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
    apiKey: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON",
    authDomain: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON",
    databaseURL: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON",
    projectId: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON",
    storageBucket: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON",
    messagingSenderId: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON",
    appId: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON",
    measurementId: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON"
 });

export const db = app.firestore();
export const storage = app.storage();
export const firebaseAuth = app.auth();
export default app;
