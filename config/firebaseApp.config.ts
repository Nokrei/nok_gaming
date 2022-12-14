import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAkTlPW3Xx0rvHueQ0wgyed8Zn2d4X3PHU",
  authDomain: "awesomeapp-ecc51.firebaseapp.com",
  projectId: "awesomeapp-ecc51",
  storageBucket: "awesomeapp-ecc51.appspot.com",
  messagingSenderId: "625629138706",
  appId: "1:625629138706:web:80cf702ddbeb8152ceadcb",
  measurementId: "G-677NB1P5QR",
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
