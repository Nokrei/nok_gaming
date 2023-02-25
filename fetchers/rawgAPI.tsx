import axios from "axios";

export const fetchAllGames = async (pageNumber: number) => {
  console.log("Fetching all games...");
  const response = await axios.get(
    `https://api.rawg.io/api/games?key=567d69a8bf924ba1bebbf68419d9cd46&page=${pageNumber}`
  );
  const allGames = response.data.results;
  console.log(allGames);

  return allGames;
};
