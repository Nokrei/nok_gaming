import Image from "next/image";
import InfoText from "../InfoText/InfoText";
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

type Props = {
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

export default function GameBasics({ gameData }: Props) {
  if (!gameData) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="col-span-2 rounded bg-gray-800  p-5 text-gray-400 lg:col-span-1 ">
      <InfoText text="This is a basic info card. Obtained by calling the RAWG API game id endpoint." />
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
        {gameData.background_image && (
          <Image
            width={600}
            height={600}
            src={gameData.background_image}
            alt={gameData.name}
          />
        )}
      </div>
      <div className="pt-5">
        <p>{gameData.description_raw}</p>
      </div>
    </div>
  );
}
