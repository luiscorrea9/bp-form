// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASPPBbDBkq-28TJgE6LPgEvpUjuknpaVE",
  authDomain: "form-bp.firebaseapp.com",
  projectId: "form-bp",
  storageBucket: "form-bp.appspot.com",
  messagingSenderId: "1094126016343",
  appId: "1:1094126016343:web:b135f3fdb4a96eb16d9012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}