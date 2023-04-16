import { fetchAllStoresInfo } from "../fetchers/cheapshark";
import { useQuery } from "@tanstack/react-query";

type Data = {
  storeId: string;
  storeName: string;
};

export const useStoresInfo = () => {
  const { data, isLoading, isError, error } = useQuery<Data[], Error>({
    queryKey: ["AllStoresInfo"],
    queryFn: () => fetchAllStoresInfo(),
    keepPreviousData: true,
  });

  return { data, isLoading, isError, error };
};
