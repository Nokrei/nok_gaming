import axios from "axios";
const baseURL = "https://www.cheapshark.com/api/1.0";

// CheapShark API does not require an API key.
// Therefore it is safe to make calls from client level.
export const fetchAllRelatedDeals = async (gameTitle: string) => {
  console.log("Fetching all deals...");
  const response = await axios.get(`${baseURL}/games?title=${gameTitle}`);
  const allRelatedDeals = await response.data;
  return allRelatedDeals;
};

export const fetchDealsForSpecificTitle = async (gameId: string) => {
  console.log("Fetching deals for specific title...");
  const response = await axios.get(`${baseURL}/games?id=${gameId}`);
  const specificDealsForTitle = await response.data;
  return specificDealsForTitle;
};

export const fetchAllStoresInfo = async () => {
  console.log("Fetching all stores info...");
  const response = await axios.get(`${baseURL}/stores`);
  const allStoresInfo = await response.data;
  return allStoresInfo;
};
