import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { arrayUnion, updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "@/config/firebaseApp.config";
import AuthContext from "@/context/AuthContext";
import InfoText from "../InfoText/InfoText";

type Game = {
  id: number;
  background_image: string;
  name: string;
};

type GameCard = {
  game: Game;
  isFavourite: boolean;
};

export default function GameCard({ isFavourite, game }: GameCard) {
  // Styles for highlighting favourite games.
  const highlightedStyle = "green";
  const regularStyle = "white";

  const { loggedInUser } = useContext(AuthContext);

  // By default a game is not highlighted.
  const [cardShadowStyle, setCardShadowStyle] = useState({
    color: "green",
  });

  //  On click - add a game to favourites, or if game already is in favourites
  //  remove it. Game will be highlighted / have highlight removed without
  //  page refresh.
  const addOrRemoveFavourite = async (
    id: number,
    background_image: string,
    name: string
  ) => {
    if (cardShadowStyle.color === regularStyle) {
      await updateDoc(doc(db, "users", JSON.parse(loggedInUser).uid), {
        favouriteGames: arrayUnion({ id, background_image, name }),
      });
      setCardShadowStyle({
        color: highlightedStyle,
      });
    } else {
      await updateDoc(doc(db, "users", JSON.parse(loggedInUser).uid), {
        favouriteGames: arrayRemove({ id, background_image, name }),
      });
      setCardShadowStyle({
        color: regularStyle,
      });
    }
  };

  // On page load - if a game is in user's favourite list in Firestore
  // highlight it.
  useEffect(() => {
    if (isFavourite) {
      setCardShadowStyle({
        color: highlightedStyle,
      });
    } else {
      setCardShadowStyle({
        color: regularStyle,
      });
    }
  }, [isFavourite]);

  return (
    <div className="group mb-10 w-60  shadow-lg duration-100 ">
      <div className=" relative h-80 w-60">
        <div className="relative z-20 flex justify-between">
          <button
            onClick={() => {
              addOrRemoveFavourite(game.id, game.background_image, game.name);
            }}
            className="w-1/2 cursor-pointer bg-green-500  duration-200 hover:bg-green-300  "
          >
            Fav
          </button>
          <Link
            className="w-6/12"
            href={{
              pathname: `/game/${game.id}`,
              query: {
                id: game.id,
                title: game.name,
              },
            }}
          >
            <button className="w-full  cursor-pointer bg-blue-500  duration-200 hover:bg-blue-300  ">
              Details
            </button>
          </Link>
        </div>
        {game.background_image && (
          <Image
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width:1200px) 50vw"
            src={game.background_image}
            placeholder="blur"
            blurDataURL={game.background_image}
            alt={`${game.name} poster`}
          />
        )}
      </div>
      <div>
        <p style={cardShadowStyle} className="bg-black text-center text-white">
          {game.name}
        </p>
      </div>
    </div>
  );
}
