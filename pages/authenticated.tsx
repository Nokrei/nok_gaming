import React, { useState, useEffect, useContext } from "react";
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
  const [games, setGames] = useState<any[]>([]);
  const [userFavouriteGames, setUserFavouriteGames] = useState<any[]>([]);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(JSON.stringify(user));
    } else {
      router.push("/");
      setLoggedInUser(null);
    }
  });

  const allGamesQuery = useQuery({
    queryKey: ["allGames"],
    queryFn: () => fetchAllGames(1),
  });

  const getUserFavouriteGames = async () => {
    const docRef = doc(db, "users", JSON.parse(loggedInUser).uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserFavouriteGames(docSnap.data().favouriteGames);
      setUsername(docSnap.data().fullName);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      getUserFavouriteGames();
    }
  }, [loggedInUser]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-10">
        Welcome {username}
      </h1>
      <p className="text-center mb-20">
        Click a game card to add it to your favourites. <br />
        Click it again to remove.
      </p>
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  justify-items-center">
        {allGamesQuery.data?.map((game: any) => {
          return (
            <GameCard
              key={game.id}
              gameId={game.id}
              gameTitle={game.name}
              gameImageSrc={game.background_image}
              gameImageAltText={game.name}
              isFavourite={
                userFavouriteGames &&
                userFavouriteGames.includes(game.id) &&
                true
              }
            />
          );
        })}
      </div>
    </Layout>
  );
}
