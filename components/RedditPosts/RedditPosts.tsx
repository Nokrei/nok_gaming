import { useQuery } from "@tanstack/react-query";
import { fetchPostsFromGameSubreddit } from "../../fetchers/rawgAPI";

type RedditPosts = {
  gameId: string;
};
type Post = {
  id: number;
  created: string;
  username: string;
  url: string;
  name: string;
};

export default function RedditPosts({ gameId }: RedditPosts) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["RedditPosts"],
    queryFn: () => fetchPostsFromGameSubreddit(parseInt(gameId)),
  });
  console.log(data);

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }
  if (isError) {
    return <p className="text-red-600">Something went wrong</p>;
  }
  return (
    <div>
      {data.results.map((post: Post) => {
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
