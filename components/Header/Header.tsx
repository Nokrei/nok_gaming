import React, { useContext } from "react";
import { signOut, getAuth } from "firebase/auth";
import AuthContext from "../../context/AuthContext";

export default function Header() {
  const { loggedInUser } = useContext(AuthContext);
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-between align-middle p-4 mb-5 bg-teal-900 shadow">
      <h1 className="text-center justify-self-center font-bold text-xl text-white ">
        Nok Gaming
      </h1>
      {loggedInUser && (
        <button
          className="rounded text-white bg-teal-700 py-1 px-2 font-semibold font-sans hover:bg-teal-800 duration-200"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      )}
    </div>
  );
}
