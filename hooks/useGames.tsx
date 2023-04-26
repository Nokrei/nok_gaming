import { fetchGameDetails } from "../fetchers/rawgAPI";
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

type Ratings = {
  id: number;
  title: string;
  count: number;
};

type Data = {
  genres: Genre[];
  name: string;
  platforms: Platform[];
  background_image: string;
  description_raw: string;
  ratings: Ratings[];
};

export const useGames = (gameId: string) => {
  const { data, isLoading, isFetching, isError, error } = useQuery<Data, Error>(
    {
      queryKey: ["GameDetails"],
      queryFn: () => fetchGameDetails(parseInt(gameId)),
      keepPreviousData: true,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};
