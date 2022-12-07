import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseApp.config";
import AuthContext from "@/context/AuthContext";
import Layout from "@/components/Layout/Layout";
import AuthForm from "@/components/AuthForm/AuthForm";

export default function Home() {
  const router = useRouter();
  const { createAccount, logIn, googleSignIn } = useContext(AuthContext);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
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
            <p onClick={googleSignIn}>Sign in with google</p>
            <h2>Login</h2>
            <AuthForm action={logIn} buttonText="Login" />
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
            <AuthForm action={createAccount} buttonText="Register" />
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
