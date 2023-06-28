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
        <div className="flex gap-2">
          <Link href="/favourites">
            <button className="rounded bg-slate-900 py-1 px-2 font-sans font-semibold duration-100 hover:bg-slate-700">
              Favourites
            </button>
          </Link>
          <button
            className="rounded bg-teal-900 py-1 px-2 font-sans font-semibold text-white duration-200 hover:bg-teal-700"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
