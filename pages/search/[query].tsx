import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { searchForGames } from "../../fetchers/rawgAPI";
import Layout from "@/components/Layout/Layout";
import GameCard from "@/components/GameCard/GameCard";

export default function SearchPage() {
  const router = useRouter();

  const searchQuery = router.query.query;

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["searchGames", router.query.page],
      queryFn: () => searchForGames(1, searchQuery as string),
      keepPreviousData: true,
    });
  console.log(data);

  return (
    <Layout>
      <h1 className="py-10 text-center text-3xl font-bold">
        Search results for: {searchQuery}
      </h1>
      {isLoading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className=" grid justify-items-center sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5">
          {data.results.map((game: any) => (
            <GameCard game={game} isFavourite={false} key={game.id} />
          ))}
        </div>
      )}
    </Layout>
  );
}
