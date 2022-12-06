import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  updateDoc,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import axios from "axios";
import { auth, db } from "../config/firebaseApp.config";
import Layout from "../components/Layout/Layout";
import AuthContext from "../context/AuthContext";

export default function Authenticated() {
  const [games, setGames] = useState<any[]>([]);
  const [cardStyle, setCardStyle] = useState<any>({
    boxShadow: "10px 10px 5px 0px rgba(71,222,37,0.75)",
  });
  const [userFavouriteGames, setUserFavouriteGames] = useState<any[]>([]);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const router = useRouter();

  const usersRef = collection(db, "users");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser(JSON.stringify(user));
    } else {
      router.push("/");
      setLoggedInUser("");
    }
  });

  const addToFavourites = async (game: string) => {
    await updateDoc(doc(db, "users", JSON.parse(loggedInUser).uid), {
      favouriteGames: arrayUnion(game),
    });
  };

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
            <div
              onClick={() => addToFavourites(game.id)}
              style={
                userFavouriteGames.includes(game.id)
                  ? cardStyle
                  : { boxShadow: "" }
              }
              className="w-60 mb-10  shadow-lg shadow-slate-500"
              key={game.id}
            >
              <div className=" relative w-60 h-80">
                <Image
                  fill
                  objectFit="cover"
                  sizes="(max-width:1200px) 50vw"
                  src={game.background_image}
                  alt={`${game.name} poster`}
                />
              </div>
              <p className=" text-white bg-black "> {game.name}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
