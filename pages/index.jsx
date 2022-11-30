import Head from "next/head";
import dynamic from "next/dynamic";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../config/firebaseApp.config";

const AuthFirebase = dynamic(() => import("../utils/AuthFirebase"), {
  ssr: false,
});

export default function Home() {
  firebase.initializeApp(firebaseConfig);
  return (
    <div>
      <AuthFirebase auth={firebase.auth} />
    </div>
  );
}
