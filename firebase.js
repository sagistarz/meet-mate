// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWs_r7Cfd9b9UyC_xvDVKICovXaQXzAM4",
  authDomain: "miniproject-auth-d5476.firebaseapp.com",
  projectId: "miniproject-auth-d5476",
  storageBucket: "miniproject-auth-d5476.appspot.com",
  messagingSenderId: "542362509114",
  appId: "1:542362509114:web:c49823bf858f2f9c9e7a03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
