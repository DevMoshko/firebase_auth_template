import firebase from 'firebase';
import "firebase/analytics";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const FIREBASE = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APPDATA_BASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BACKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
})
console.log(process.env.REACT_APP_STORAGE_BACKET)

export const AUTH = FIREBASE.auth()
export const STORAGE = FIREBASE.storage()
export const STORE = FIREBASE.firestore()
export default FIREBASE