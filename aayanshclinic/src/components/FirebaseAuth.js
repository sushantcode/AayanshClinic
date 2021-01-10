import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
    apiKey: "PROJECT_API_KEY_REMOVED_FOR_SECURITY_REASON",
    authDomain: "PROJECT_authDomain_REMOVED_FOR_SECURITY_REASON",
    databaseURL: "PROJECT_databaseURL_REMOVED_FOR_SECURITY_REASON",
    projectId: "PROJECT_projectId_REMOVED_FOR_SECURITY_REASON",
    storageBucket: "PROJECT_storageBucket_REMOVED_FOR_SECURITY_REASON",
    messagingSenderId: "PROJECT_messagingSenderId_REMOVED_FOR_SECURITY_REASON",
    appId: "PROJECT_appId_REMOVED_FOR_SECURITY_REASON",
    measurementId: "PROJECT_measurementId_REMOVED_FOR_SECURITY_REASON"
 });

export const db = app.firestore();
export const storage = app.storage();
export const firebaseAuth = app.auth();
export default app;