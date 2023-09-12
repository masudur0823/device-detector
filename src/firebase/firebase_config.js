// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsjWWZRMea8C2tamZZnjjok1mKIPV8kG0",
  authDomain: "expense-tracker-73e37.firebaseapp.com",
  projectId: "expense-tracker-73e37",
  storageBucket: "expense-tracker-73e37.appspot.com",
  messagingSenderId: "44935494854",
  appId: "1:44935494854:web:ed514d5ec73bcaa945ebc7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
