import axios from "axios";

// RAWG API requires and API key in each call.
// Therefore calls to the API itself are made from api routes.
export const fetchAllGames = async (pageNumber: number) => {
  console.log("Fetching all games...");
  const response = await axios.get(`/api/allGames?pageNumber=${pageNumber}`);
  const allGames = response.data;
  return allGames;
};

export const fetchGameDetails = async (gameId: number) => {
  console.log("Fetching game details...");
  const response = await axios.get(`/api/gameDetails?gameId=${gameId}`);
  const game = response.data;
  return game;
};

export const fetchPostsFromGameSubreddit = async (gameId: number) => {
  console.log("Fetching subreddit posts...");
  const response = await axios.get(`/api/redditPosts?gameId=${gameId}`);
  const redditPosts = response.data;
  return redditPosts;
};

export const searchForGames = async (
  pageNumber: number,
  searchQuery: string
) => {
  console.log("Searching for games...");
  const response = await axios.get(
    `/api/searchGames?searchQuery=${searchQuery}&pageNumber=${pageNumber}`
  );
  const searchResults = response.data;
  return searchResults;
};
