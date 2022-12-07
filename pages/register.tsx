import React, { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import AuthContext from "@/context/AuthContext";
import AuthForm from "@/components/AuthForm/AuthForm";

export default function RegisterPage() {
  const router = useRouter();
  const { createAccount } = useContext(AuthContext);
  return (
    <Layout>
      <div>
        <h2 className="text-center text-xl">Register</h2>
        <AuthForm
          action={createAccount}
          buttonText="Register"
          isForRegistration
        />
        <div className="text-center mt-4">
          <p>Already have an account?</p>
          <p>
            Click{" "}
            <span
              className=" cursor-pointer text-blue-400 hover:text-blue-600 duration-100 font-bold"
              onClick={() => router.push("/login")}
            >
              here
            </span>{" "}
            to login
          </p>
        </div>
      </div>
    </Layout>
  );
}
