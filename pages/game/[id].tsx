import { useRouter } from "next/router";
import { useGames } from "../../hooks/useGames";
import GameStats from "@/components/GameStats/GameStats";
import GameBasics from "@/components/GameBasics/GameBasics";
import RedditPosts from "@/components/RedditPosts/RedditPosts";
import AllRelatedDeals from "@/components/AllRelatedDeals/AllRelatedDeals";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";

// Router query params are undefined before hydration.
// Trigerring the query only after router is ready.

export default function GamePage() {
  const router = useRouter();
  const { id, title } = router.query;

  const { data, isLoading, isError, error, refetch } = useGames(id as string);
  useEffect(() => {
    if (router.isReady) {
      refetch();
    }
  }, [router, refetch]);

  return (
    <Layout
      title={`Nok Gaming | ${title as string}`}
      description={`Description, stats and deals for ${title as string} `}
    >
      <div className="bg-slate-900 py-5 md:static">
        <div className="grid grid-cols-1 gap-3 px-5 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <GameBasics gameData={data} />
            <div className="">
              <RedditPosts gameId={id as string} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <GameStats gameData={data} />
            <AllRelatedDeals gameTitle={title as string} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
