import Image from "next/image";
import { fetchGameDetails } from "../../fetchers/rawgAPI";
import { useQuery } from "@tanstack/react-query";
import { useGames } from "../../hooks";

type Genre = {
  id: number;
  name: string;
};

type Platform = {
  platform: {
    id: number;
    name: string;
  };
};

type GameBasics = {
  gameId: string;
};

type Data = {
  gameData:
    | {
        genres: Genre[];
        name: string;
        platforms: Platform[];
        background_image: string;
        description_raw: string;
      }
    | undefined;
};

type Error = {
  message: string;
  statusCode: number;
};

export default function GameBasics({ gameData }: Data) {
  if (!gameData) {
    return <p className="text-white">Loading...</p>;
  }
  console.log(gameData);

  return (
    <div className="col-span-2 rounded bg-gray-800  p-5 text-gray-400 lg:col-span-1 ">
      <h1 className="text-center text-3xl font-bold">{gameData.name}</h1>
      <div className="flex flex-wrap justify-center gap-5 pt-5">
        {gameData.genres.map((genre) => {
          return (
            <button
              className="rounded bg-yellow-600 px-2 py-1 text-white"
              key={genre.id}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-3 py-5">
        {gameData.platforms.map((platform) => {
          return (
            <button
              className="rounded-lg bg-sky-600 px-2 text-white "
              key={platform.platform.id}
            >
              {platform.platform.name}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Image
          width={600}
          height={600}
          src={gameData.background_image}
          alt={gameData.name}
        />
      </div>
      <div className="pt-5">
        <p>{gameData.description_raw}</p>
      </div>
    </div>
  );
}
