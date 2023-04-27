import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseApp.config";
import { useGames } from "../../hooks/useGames";
import GameStats from "@/components/GameStats/GameStats";
import GameBasics from "@/components/GameBasics/GameBasics";
import RedditPosts from "@/components/RedditPosts/RedditPosts";
import AllRelatedDeals from "@/components/AllRelatedDeals/AllRelatedDeals";
import Layout from "@/components/Layout/Layout";

export default function GamePage() {
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push("/");
    }
  });

  const { id, title } = router.query as { id: string; title: string };
  const { data, isLoading, isError, error } = useGames(id);

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

export async function getServerSideProps(context: NextPageContext) {
  const { id, title } = context.query;
  return { props: { id, title } };
}
