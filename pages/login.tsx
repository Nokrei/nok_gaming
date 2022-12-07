import React, { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import AuthContext from "@/context/AuthContext";
import AuthForm from "@/components/AuthForm/AuthForm";

export default function LoginPage() {
  const router = useRouter();
  const { logIn } = useContext(AuthContext);
  return (
    <Layout>
      <div>
        <h2 className="text-center text-xl">Login</h2>
        <AuthForm action={logIn} buttonText="Login" isForRegistration={false} />
        <div className="text-center mt-4">
          <p>{"Don't"} have an account?</p>
          <p>
            Click{" "}
            <span
              className=" cursor-pointer text-blue-400 hover:text-blue-600 duration-100 font-bold"
              onClick={() => router.push("/register")}
            >
              here
            </span>{" "}
            to register
          </p>
        </div>
      </div>
    </Layout>
  );
}
