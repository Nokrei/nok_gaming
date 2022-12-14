import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { arrayUnion, updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "@/config/firebaseApp.config";
import AuthContext from "@/context/AuthContext";

type GameCard = {
  game: any;
  isFavourite: boolean;
};

export default function GameCard({ isFavourite, game }: GameCard) {
  // Styles for highlighting favourite games.
  const highlightedStyle = "10px 10px 5px 0px rgba(71,222,37,0.75)";
  const regularStyle = "10px 10px 5px 0px rgba(0,0,0,0.75)";

  const { loggedInUser } = useContext(AuthContext);

  // By default a game is not highlighted.
  const [cardShadowStyle, setCardShadowStyle] = useState({
    boxShadow: regularStyle,
  });

  //  On click - add a game to favourites, or if game already is in favourites
  //  remove it. Game will be highlighted / have highlight removed without
  //  page refresh.
  const addToFavourites = async (game: string) => {
    if (cardShadowStyle.boxShadow === regularStyle) {
      await updateDoc(doc(db, "users", JSON.parse(loggedInUser).uid), {
        favouriteGames: arrayUnion(game),
      });
      setCardShadowStyle({
        boxShadow: highlightedStyle,
      });
    } else {
      await updateDoc(doc(db, "users", JSON.parse(loggedInUser).uid), {
        favouriteGames: arrayRemove(game),
      });
      setCardShadowStyle({
        boxShadow: regularStyle,
      });
    }
  };

  // On page load - if a game is in user's favourite list in Firestore
  // highlight it.
  useEffect(() => {
    if (isFavourite) {
      setCardShadowStyle({
        boxShadow: highlightedStyle,
      });
    } else {
      setCardShadowStyle({
        boxShadow: regularStyle,
      });
    }
  }, [isFavourite]);

  return (
    <div
      onClick={() => {
        addToFavourites(game.id);
      }}
      className="w-60 mb-10 shadow-lg cursor-pointer hover:scale-105 duration-100"
      style={cardShadowStyle}
    >
      <div className=" relative w-60 h-80">
        <Image
          fill
          objectFit="cover"
          sizes="(max-width:1200px) 50vw"
          src={game.background_image}
          placeholder="blur"
          blurDataURL={game.background_image}
          alt={`${game.name} poster`}
        />
      </div>
      <p className=" text-white bg-black "> {game.name}</p>
    </div>
  );
}
