import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { arrayUnion, updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../../config/firebaseApp.config";
import AuthContext from "../../context/AuthContext";

type GameCard = {
  gameImageSrc: string;
  gameImageAltText: string;
  gameTitle: string;
  gameId: any;
  key: any;
  isFavourite: boolean;
};

export default function GameCard({
  gameImageSrc,
  gameImageAltText,
  gameTitle,
  gameId,
  isFavourite,
}: GameCard) {
  // Styles for highlighting favourite games.
  const highlightedStyle = "10px 10px 5px 0px rgba(71,222,37,0.75)";
  const regularStyle = "10px 10px 5px 0px rgba(0,0,0,0.75)";

  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

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
        boxShadow: "10px 10px 5px 0px rgba(71,222,37,0.75)",
      });
    } else {
      setCardShadowStyle({
        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
      });
    }
  }, [isFavourite]);

  return (
    <div
      onClick={() => {
        addToFavourites(gameId);
      }}
      className="w-60 mb-10 shadow-lg cursor-pointer hover:scale-105 duration-100"
      style={cardShadowStyle}
    >
      <div className=" relative w-60 h-80">
        <Image
          fill
          objectFit="cover"
          sizes="(max-width:1200px) 50vw"
          src={gameImageSrc}
          alt={`${gameImageAltText} poster`}
        />
      </div>
      <p className=" text-white bg-black "> {gameTitle}</p>
    </div>
  );
}
