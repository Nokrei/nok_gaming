import { useRedditPosts } from "../../hooks/useRedditPosts";
import InfoText from "../InfoText/InfoText";

type Props = {
  gameId: string;
};

export default function RedditPosts({ gameId }: Props) {
  const { data, isLoading, isError, error } = useRedditPosts(gameId);

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }
  if (isError) {
    return <p className="text-red-600">Something went wrong</p>;
  }
  return (
    <div className="rounded bg-gray-800 p-5 text-gray-400">
      <InfoText text="This is a list of Reddit posts related to the game. Not every game has reddit posts assotiated with it. Obtained by calling the RAWG API reddit endpoint." />
      <h2 className="text-center text-3xl">Recent discussion</h2>
      {data!.results.map((post) => {
        return (
          <div key={post.id} className="my-5 rounded bg-gray-900  p-5">
            <div className="flex justify-between pb-5 text-gray-400">
              <span>On: {new Date(post.created).toDateString()}</span>
              <span>By: {post.username.replace("/u/", "")}</span>
            </div>

            <p className="text-xl ">{post.name}</p>
            <div className="text-right">
              <a href={post.url} target="_blank" rel="noreferrer noopener">
                <button className="mt-5 rounded bg-slate-500 p-1 px-2 text-black duration-100 hover:bg-slate-300">
                  View original post
                </button>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
