import axios from "axios";
const baseURL = "https://api.rawg.io/api/games";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export const fetchAllGames = async (pageNumber: number) => {
  console.log("Fetching all games...");
  const response = await axios.get(
    `${baseURL}?key=${API_KEY}&page=${pageNumber}`
  );
  const allGames = response.data;
  return allGames;
};

export const fetchGameDetails = async (gameId: number) => {
  console.log("Fetching game details...");
  const response = await axios.get(`${baseURL}/${gameId}?key=${API_KEY}`);
  const game = response.data;
  return game;
};

export const fetchPostsFromGameSubreddit = async (gameId: number) => {
  console.log("Fetching subreddit posts...");
  const response = await axios.get(
    `${baseURL}/${gameId}/reddit?key=${API_KEY}`
  );
  const redditPosts = response.data;
  return redditPosts;
};

export const searchForGames = async (
  pageNumber: number,
  searchQuery: string
) => {
  console.log("Searching for games...");
  const response = await axios.get(
    `${baseURL}?key=${API_KEY}&page=${pageNumber}&search=${searchQuery}`
  );
  const searchResults = response.data;
  return searchResults;
};
