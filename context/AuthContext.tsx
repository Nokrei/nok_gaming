import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/config/firebaseApp.config";

type Context = {
  loggedInUser: any;
  setLoggedInUser: any;
  firebaseError: any;
  createAccount: any;
  logIn: any;
  googleSignIn: any;
};

const user: Context = {
  loggedInUser: "",
  setLoggedInUser: "",
  firebaseError: null,
  createAccount: null,
  logIn: null,
  googleSignIn: null,
};

const AuthContext = createContext(user);

export const AuthProvider = ({ children }: { children: any }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);

  // Register
  const createAccount = (email: string, password: string) => {
    setFirebaseError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
        });
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  // Login
  const logIn = (email: string, password: string) => {
    setFirebaseError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  // Sign in with Google
  const googleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential?.accessToken;
      const user = res.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        createAccount,
        logIn,
        firebaseError,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
