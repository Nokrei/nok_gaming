import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useGames } from "../../hooks/useGames";
import AuthContext from "@/context/AuthContext";
import GameStats from "@/components/GameStats/GameStats";
import GameBasics from "@/components/GameBasics/GameBasics";
import RedditPosts from "@/components/RedditPosts/RedditPosts";
import AllRelatedDeals from "@/components/AllRelatedDeals/AllRelatedDeals";
import Layout from "@/components/Layout/Layout";

export default function GamePage() {
  const router = useRouter();
  const { loggedInUser } = useContext(AuthContext);
  const { id, title } = router.query as { id: string; title: string };
  const { data, isLoading, isError, error } = useGames(id);

  useEffect(() => {
    if (!loggedInUser) {
      router?.push("/");
    }
  }, [router, loggedInUser]);

  if (!loggedInUser) {
    return (
      <Layout>
        <h2 className="text-center text-white">
          You must be logged in to view this page
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-900 py-5 md:static">
        <div className="grid grid-cols-1 gap-3 px-5 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <GameBasics gameData={data} />
            <div className="">
              <RedditPosts gameId={id} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <GameStats gameData={data} />
            <AllRelatedDeals gameTitle={title} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
