import React from "react";
import { signOut, getAuth } from "firebase/auth";

export default function Header() {
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-between align-middle p-4 mb-5 bg-teal-800">
      <h1 className="text-center justify-self-center font-bold text-xl text-white ">
        Nok Gaming
      </h1>
      <button
        className="rounded bg-teal-100 py-1 px-2 font-semibold font-sans hover:bg-teal-300 duration-200"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
