import axios from "axios";

export const fetchScrapingData = async (titleOfGame: string) => {
  console.log("Fetching scraped data...");
  const response = await axios({
    method: "POST",
    url: "/api/scrapeCharts",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(titleOfGame),
  });
  const scrapingData = response.data;
  return scrapingData;
};
