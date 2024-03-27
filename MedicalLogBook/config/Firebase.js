// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC2xOlvfUcX8ajYBjkO1bI1SNpxnxCphY",
  authDomain: "medicallogbook-b8d1a.firebaseapp.com",
  projectId: "medicallogbook-b8d1a",
  storageBucket: "medicallogbook-b8d1a.appspot.com",
  messagingSenderId: "187447399182",
  appId: "1:187447399182:web:f929b94cb9953169363d5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// export const tripsRef = collection(db);
export default app;
