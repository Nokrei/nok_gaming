import { useQuery } from "@tanstack/react-query";
import { fetchPostsFromGameSubreddit } from "../fetchers/rawgAPI";

type Post = {
  id: number;
  created: string;
  username: string;
  url: string;
  name: string;
};

type Data = {
  results: Post[];
};

export const useRedditPosts = (gameID: string) => {
  const { data, isLoading, isFetching, isError, error } = useQuery<Data, Error>(
    {
      queryKey: ["RedditPosts"],
      queryFn: () => fetchPostsFromGameSubreddit(parseInt(gameID)),
    }
  );
  return { data, isLoading, isError, error };
};
