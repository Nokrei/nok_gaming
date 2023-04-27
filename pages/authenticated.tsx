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

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(JSON.stringify(user));
    } else {
      router.push("/");
      setLoggedInUser("");
    }
  });

  const pageNumber = Number(router.query.page);

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["allGames", router.query.page],
      queryFn: () => fetchAllGames(pageNumber),
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
      <h1 className="py-10 text-center text-3xl font-bold">
        Welcome {displayedName}
      </h1>

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
      <p className="text-center text-white">Current Page: {pageNumber}</p>
      {isFetching && <p className="text-center text-white">Loading...</p>}
      <div className="flex justify-center gap-5">
        <button
          disabled={pageNumber <= 1}
          onClick={() => {
            router.push({
              pathname: "/authenticated",
              query: { page: pageNumber - 1 },
            });
          }}
          className="w-32 rounded bg-blue-500 p-2 text-white duration-100 hover:bg-blue-300"
        >
          Prev
        </button>
        <button
          onClick={() => {
            router.push({
              pathname: "/authenticated",
              query: { page: pageNumber + 1 },
            });
          }}
          className="w-32 rounded bg-blue-500 p-2 text-white duration-100 hover:bg-blue-300"
        >
          Next
        </button>
      </div>
    </Layout>
  );
}
