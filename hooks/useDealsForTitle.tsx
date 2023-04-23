import { fetchDealsForSpecificTitle } from "../fetchers/cheapshark";
import { useQuery } from "@tanstack/react-query";

type LowestPrice = {
  price: string;
  date: Date;
};

type Deal = {
  storeID: string;
  dealID: string;
  price: string;
  retailPrice: string;
  savings: string;
};

type Info = {
  steamAppId: string;
  title: string;
};

type Data = {
  cheapestPriceEver: LowestPrice;
  deals: Deal[];
  info: Info;
};

export const useDealsForTitle = (gameId: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery<Data, Error>({
    queryKey: ["DealsForTitle"],
    queryFn: () => fetchDealsForSpecificTitle(gameId),
    enabled: false,
    keepPreviousData: true,
  });

  return { data, isLoading, isError, error, refetch };
};
