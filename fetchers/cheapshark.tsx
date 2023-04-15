import axios from "axios";
const baseURL = "https://www.cheapshark.com/api/1.0";

export const fetchAllRelatedDeals = async (gameTitle: string) => {
  console.log("Fetching all deals...");
  const response = await axios.get(`${baseURL}/games?title=${gameTitle}`);
  const allRelatedDeals = await response.data;
  return allRelatedDeals;
};
