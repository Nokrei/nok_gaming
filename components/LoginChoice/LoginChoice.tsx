import React, { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";

export default function LoginChoice() {
  const router = useRouter();
  const { googleSignIn } = useContext(AuthContext);
  return (
    <div className=" rounded mt-10 p-2 flex flex-col text-center shadow-xl w-64 m-auto">
      <h2 className=" text-xl mb-2">Welcome</h2>
      <button
        onClick={() => router.push("/login")}
        className="w-56 mb-4 p-1 rounded shadow-md m-auto text-white  bg-sky-600 hover:bg-sky-700 duration-100"
      >
        Sign in with Email
      </button>
      <button
        onClick={googleSignIn}
        className="w-56 mb-4 p-1 rounded shadow-md m-auto text-white  bg-sky-600 hover:bg-sky-700 duration-100"
      >
        Sign in with Google
      </button>
    </div>
  );
}
