import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/config/firebaseApp.config";

type Context = {
  loggedInUser: string;
  firebaseError: any;
  createAccount: (email: string, password: string, fullName: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  googleSignIn: () => void;
  isCheckingAuth: boolean;
};

const user: Context = {
  loggedInUser: "",
  firebaseError: null,
  createAccount: () => null,
  logIn: () => null,
  logOut: () => null,
  googleSignIn: () => null,
  isCheckingAuth: false,
};

const AuthContext = createContext(user);

export const AuthProvider = ({ children }: { children: any }) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [firebaseError, setFirebaseError] = useState(null);

  const router = useRouter();

  // To fix:
  // - Every page refresh when logged in pushes to /authenticated
  // - Using both Router and useRouter

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(JSON.stringify(user));
        Router.push("/authenticated?page=1");
      } else {
        setLoggedInUser("");
        Router.push("/");
      }
    });
  }, []);

  // Register
  const createAccount = (email: string, password: string, fullName: string) => {
    setFirebaseError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          fullName: fullName,
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

  // Logout
  const logOut = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  // Sign in with Google
  const googleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName,
        });
      }
      router.push("/authenticated?page=1");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        createAccount,
        logIn,
        logOut,
        firebaseError,
        googleSignIn,
        isCheckingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
