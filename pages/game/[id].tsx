import { useRouter } from "next/router";
import GameStats from "@/components/GameStats/GameStats";
import GameBasics from "@/components/GameBasics/GameBasics";
import RedditPosts from "@/components/RedditPosts/RedditPosts";

export default function GamePage() {
  const router = useRouter();
  const gameId = router.query.id;
  const gameTitle = router.query.title;

  return (
    <div>
      <div className="bg-slate-900 py-5 md:static">
        <div className=" grid grid-cols-2 gap-3 px-5">
          <GameBasics gameId={gameId as string} />
          <div className="col-span-2 lg:col-span-1">
            <GameStats gameTitle={gameTitle as string} />
          </div>
          <div className="col-span-2 rounded bg-gray-800 p-5 text-gray-400  lg:col-span-1">
            <h2 className="text-center text-3xl">Recent discussion</h2>
            <RedditPosts gameId={gameId as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
