import { useContext } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseApp.config";
import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";
import { useForm } from "react-hook-form";
// import { createAccount } from "../utils/AuthGoogle";
import AuthForm from "../components/AuthForm/AuthForm";
import AuthContext from "../context/AuthContext";

// Needs to be a dynamic import, else will throw "ReferenceError: window is not defined".
// Firebaseui expects a window object to be loaded, which it won't find due to SSR.

// const AuthFirebase = dynamic(() => import("../utils/AuthFirebase"), {
//   ssr: false,
// });

export default function Home() {
  const router = useRouter();
  const { loggedInUser } = useContext(AuthContext);
  console.log(loggedInUser);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      router.push("/authenticated");
    } else {
    }
  });

  return (
    <Layout>
      <p>{loggedInUser}</p>
      <AuthForm />
    </Layout>
  );
}
