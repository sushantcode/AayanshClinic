import * as firebase from 'firebase';

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

export const db = firebase.firestore(app);
export const storage = firebase.storage(app);
export default app;
