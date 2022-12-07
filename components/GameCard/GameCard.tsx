import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
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
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const [cardShadowStyle, setCardShadowStyle] = useState({});

  const addToFavourites = async (game: string) => {
    await updateDoc(doc(db, "users", JSON.parse(loggedInUser).uid), {
      favouriteGames: arrayUnion(game),
    });
    setCardShadowStyle({
      boxShadow: "10px 10px 5px 0px rgba(71,222,37,0.75)",
    });
  };

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

  //   let cardShadowStyle = isFavourite
  //     ? {
  //         boxShadow: "10px 10px 5px 0px rgba(71,222,37,0.75)",
  //       }
  //     : {
  //         boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
  //       };

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
