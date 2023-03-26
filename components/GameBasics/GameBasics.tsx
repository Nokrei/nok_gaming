import Image from "next/image";
import { fetchGameDetails } from "../../fetchers/rawgAPI";
import { useQuery } from "@tanstack/react-query";

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

export default function GameBasics({ gameId }: GameBasics) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["GameDetails"],
    queryFn: () => fetchGameDetails(parseInt(gameId as string)),
    keepPreviousData: true,
  });
  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }
  return (
    <div className="col-span-2 rounded bg-gray-800  p-5 text-gray-400 lg:col-span-1 ">
      <h1 className="text-center text-3xl font-bold">{data.name}</h1>
      <div className="flex flex-wrap justify-center gap-5 pt-5">
        {data.genres.map((genre: Genre) => {
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
        {data.platforms.map((platform: Platform) => {
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
          src={data.background_image}
          alt={data.name}
        />
      </div>
      <div className="pt-5">
        <p>{data.description_raw}</p>
      </div>
    </div>
  );
}
