import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "../config/firebaseApp.config";
import Layout from "../components/Layout/Layout";

export default function Authenticated() {
  const [games, setGames] = useState<any[]>([]);

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      router.push("/");
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
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getGames();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-10">
        You are logged in
      </h1>
      <div className=" grid grid-cols-5 justify-items-center">
        {games.map((game) => {
          return (
            <div className="w-60 mb-5" key={game.id}>
              <div className=" relative w-60 h-80">
                <Image
                  fill
                  objectFit="cover"
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
