import { useContext } from "react";
import Link from "next/link";
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
    <div className=" flex justify-between bg-gray-800 p-4 align-middle shadow">
      <Link href="/">
        <h1 className="justify-self-center text-center text-xl font-bold text-white ">
          Nok Gaming
        </h1>
      </Link>
      {loggedInUser && (
        <button
          className="rounded bg-teal-700 py-1 px-2 font-sans font-semibold text-white duration-200 hover:bg-teal-800"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      )}
    </div>
  );
}
