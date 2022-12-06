import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { CreateAccount, LogIn } from "../utils/AuthGoogle";
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
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      router.push("/authenticated");
    } else {
    }
  });

  return (
    <Layout>
      <div className="text-center">
        <h1>Welcome to Nok Gaming</h1>

        {!showCreateAccountForm ? (
          <div>
            <h2>Login</h2>
            <AuthForm action={LogIn} buttonText="Login" />
            <p>{"Don't"} have an account?</p>
            <p>
              Click{" "}
              <span
                className=" cursor-pointer text-blue-400 hover:text-blue-600 duration-100 font-bold"
                onClick={() => setShowCreateAccountForm(true)}
              >
                here
              </span>{" "}
              to register
            </p>
          </div>
        ) : (
          <div>
            <h2>Register</h2>
            <AuthForm action={CreateAccount} buttonText="Register" />
            <p>Already have an account?</p>
            <p>
              Click{" "}
              <span
                className=" cursor-pointer text-blue-400 hover:text-blue-600 duration-100 font-bold"
                onClick={() => setShowCreateAccountForm(false)}
              >
                here
              </span>{" "}
              to login
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
