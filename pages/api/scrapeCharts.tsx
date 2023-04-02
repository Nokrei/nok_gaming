import type { NextApiRequest, NextApiResponse } from "next";
const { chromium: playwright } = require("playwright-core");
const chromium = require("@sparticuz/chromium");

// const playwright = require('playwright-aws-lambda');

const scrapeCharts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Get title of game to scrape
    const gameTitle = req.body;

    // Open chromium browser
    const browser = await playwright.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    // Open new page / tab in browser
    const page = await browser.newPage();

    // Navigate to the search results on steam charts using game title as search term
    await page.goto(`https://steamcharts.com/search/?q=${gameTitle}`);
    try {
      await page.click(".common-table a");
      const recentAndPeakData = await page
        .locator(".app-stat .num")
        .allInnerTexts();

      const monthlyAveragePlayers = await page
        .locator(".odd .num-f")
        .allInnerTexts();

      const datesForAverageData = await page
        .locator(".odd .month-cell")
        .allInnerTexts();

      const monthlyAverageData = [];
      for (let i = 0; i < monthlyAveragePlayers.length; i++) {
        monthlyAverageData.push({
          average_players: monthlyAveragePlayers[i],
          month: datesForAverageData[i],
        });
      }
      monthlyAverageData.reverse();

      const scrapingData = {
        recentAndPeakData,
        monthlyAverageData,
      };
      res.status(200).json(scrapingData);
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .json({ message: `Stats for title: ${gameTitle} not found` });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default scrapeCharts;
