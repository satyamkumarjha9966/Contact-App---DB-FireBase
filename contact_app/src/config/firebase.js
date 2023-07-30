// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq7sGsG2U8Cxu7dxnpLV_FuUJnfpUE940",
  authDomain: "contact-app-568f8.firebaseapp.com",
  projectId: "contact-app-568f8",
  storageBucket: "contact-app-568f8.appspot.com",
  messagingSenderId: "181448228843",
  appId: "1:181448228843:web:9eebebf6a8a968f90863ae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);