import React, { useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseApp.config";
import AuthContext from "@/context/AuthContext";
import Layout from "@/components/Layout/Layout";
import GameCard from "@/components/GameCard/GameCard";
import Search from "@/components/Search/Search";

export default function FavouritesPage() {
  const [userFavouriteGames, setUserFavouriteGames] = useState<any[]>([]);
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const getUserFavouriteGames = async () => {
      const docRef = doc(db, "users", JSON.parse(loggedInUser).uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserFavouriteGames(docSnap.data().favouriteGames);
      }
    };
    if (loggedInUser) {
      getUserFavouriteGames();
    }
  }, [loggedInUser]);

  return (
    <Layout>
      <h1 className="py-10 text-center text-3xl font-bold">
        Your favourite titles
      </h1>
      <div className="flex justify-center pb-10">
        <Search />
      </div>
      <div className="grid justify-items-center sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5">
        {userFavouriteGames.map((game) => (
          <GameCard key={game.id} game={game} isFavourite />
        ))}
      </div>
    </Layout>
  );
}
