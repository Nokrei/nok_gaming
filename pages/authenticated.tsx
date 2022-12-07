import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { auth, db } from "../config/firebaseApp.config";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/AuthContext";
import GameCard from "../components/GameCard/GameCard";

export default function Authenticated() {
  const [games, setGames] = useState<any[]>([]);
  const [userFavouriteGames, setUserFavouriteGames] = useState<any[]>([]);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(JSON.stringify(user));
    } else {
      router.push("/");
      setLoggedInUser("");
    }
  });

  useEffect(() => {
    const getGames = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "https://api.rawg.io/api/games?key=567d69a8bf924ba1bebbf68419d9cd46&page=1",
        });
        setGames(res.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserFavouriteGames = async () => {
      const docRef = doc(db, "users", JSON.parse(loggedInUser).uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setUserFavouriteGames(docSnap.data().favouriteGames);
      }
    };
    getGames();
    loggedInUser && getUserFavouriteGames();
  }, [loggedInUser]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-10">
        Welcome {loggedInUser && JSON.parse(loggedInUser).email}
      </h1>
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  justify-items-center">
        {games.map((game) => {
          return (
            <GameCard
              key={game.id}
              gameId={game.id}
              gameTitle={game.name}
              gameImageSrc={game.background_image}
              gameImageAltText={game.name}
              isFavourite={userFavouriteGames.includes(game.id) && true}
            />
          );
        })}
      </div>
    </Layout>
  );
}
