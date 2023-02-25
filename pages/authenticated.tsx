import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { auth, db } from "@/config/firebaseApp.config";
import { fetchAllGames } from "../fetchers/rawgAPI";
import Layout from "@/components/Layout/Layout";
import AuthContext from "@/context/AuthContext";
import GameCard from "@/components/GameCard/GameCard";

export default function AuthenticatedPage() {
  const [userFavouriteGames, setUserFavouriteGames] = useState<any[]>([]);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const [displayedName, setDisplayedName] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(JSON.stringify(user));
    } else {
      router.push("/");
      setLoggedInUser("");
    }
  });

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["allGames", selectedPage],
      queryFn: () => fetchAllGames(selectedPage),
      keepPreviousData: true,
    });

  useEffect(() => {
    const getUserFavouriteGames = async () => {
      const docRef = doc(db, "users", JSON.parse(loggedInUser).uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserFavouriteGames(docSnap.data().favouriteGames);
        setDisplayedName(docSnap.data().fullName);
      }
    };
    if (loggedInUser) {
      getUserFavouriteGames();
    }
  }, [loggedInUser]);

  return (
    <Layout>
      <h1 className="my-10 text-center text-3xl font-bold">
        Welcome {displayedName}
      </h1>
      <p className="mb-20 text-center">
        Click a game card to add it to your favourites. <br />
        Click it again to remove.
      </p>
      {isLoading ? (
        <div className="text-center text-white">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-600">Ooops...</div>
      ) : (
        <div className=" grid justify-items-center sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5">
          {data.results.map((game: any) => {
            return (
              <GameCard
                key={game.id}
                game={game}
                isFavourite={userFavouriteGames.includes(game.id)}
              />
            );
          })}
        </div>
      )}
      <p className="text-center text-white">Current Page: {selectedPage}</p>
      {isFetching && <p className="text-center text-white">Loading...</p>}
      <div className="flex justify-center gap-5">
        <button
          disabled={selectedPage <= 1}
          onClick={() => setSelectedPage((old) => Math.max(old - 1, 0))}
          className="w-32 rounded bg-blue-500 p-2 text-white duration-100 hover:bg-blue-300"
        >
          Prev
        </button>
        <button
          onClick={() => {
            setSelectedPage((old) => old + 1);
          }}
          className="w-32 rounded bg-blue-500 p-2 text-white duration-100 hover:bg-blue-300"
        >
          Next
        </button>
      </div>
    </Layout>
  );
}
