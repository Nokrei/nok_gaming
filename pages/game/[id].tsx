import { useRouter } from "next/router";
import GameStats from "@/components/GameStats/GameStats";
import GameBasics from "@/components/GameBasics/GameBasics";
import RedditPosts from "@/components/RedditPosts/RedditPosts";
import { useGames } from "../../hooks";

export default function GamePage() {
  const router = useRouter();
  const { id, title } = router.query as { id: string; title: string };
  const { data, isLoading, isError, error } = useGames(id);

  return (
    <div>
      <div className="bg-slate-900 py-5 md:static">
        <div className=" grid grid-cols-2 gap-3 px-5">
          <GameBasics gameData={data} />
          <div className="col-span-2 lg:col-span-1">
            <GameStats gameData={data} />
          </div>
          <div className="col-span-2 rounded bg-gray-800 p-5 text-gray-400  lg:col-span-1">
            <h2 className="text-center text-3xl">Recent discussion</h2>
            <RedditPosts gameId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
