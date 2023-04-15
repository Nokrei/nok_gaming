import { fetchAllRelatedDeals } from "../fetchers/cheapshark";
import { useQuery } from "@tanstack/react-query";

type Data = {
  gameID: string;
  steamAppID: string | null;
  cheapest: string;
  cheapestDealId: string;
  external: string;
  thumb: string;
};

export const useDeals = (gameTitle: string) => {
  const { data, isLoading, isFetching, isError, error } = useQuery<Data, Error>(
    {
      queryKey: ["RelatedDeals"],
      queryFn: () => fetchAllRelatedDeals(gameTitle),
      keepPreviousData: true,
    }
  );

  return { data, isLoading, isError, error };
};
