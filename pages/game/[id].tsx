import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "../../fetchers/rawgAPI";

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

export default function GamePage() {
  const router = useRouter();
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["Game"],
    queryFn: () => fetchGameDetails(parseInt(router.query.id as string)),
    keepPreviousData: true,
  });
  console.log(router.query.id);

  return (
    <div>
      {isLoading || isFetching ? (
        <p className="text-center text-white">Loading ...</p>
      ) : (
        <div className="relative py-5 md:static">
          <Image
            fill
            src={data.background_image}
            alt={data.name}
            objectFit="cover"
            objectPosition="top"
          />
          <div className="relative m-auto w-11/12 bg-black bg-opacity-80 p-5 text-white md:w-2/4">
            <h1 className="text-center text-3xl font-bold">{data.name}</h1>
            <div className="flex flex-wrap justify-center gap-5 pt-5">
              {data.genres.map((genre: Genre) => {
                return (
                  <button
                    className="rounded bg-yellow-600 px-2 py-1"
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
                    className="rounded-lg bg-sky-600 px-2 "
                    key={platform.platform.id}
                  >
                    {platform.platform.name}
                  </button>
                );
              })}
            </div>
            <div>
              <p>{data.description_raw}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
