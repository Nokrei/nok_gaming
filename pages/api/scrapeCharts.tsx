import type { NextApiRequest, NextApiResponse } from "next";
// import { chromium } from "playwright";

// const playwright = require('playwright-aws-lambda');

// const scrapeCharts = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     // Get title of game to scrape
//     const gameTitle = req.body;

//     // Open chromium browser
//     const browser = await chromium.launch({
//       headless: true,
//     });

//     // Open new page / tab in browser
//     const page = await browser.newPage();

//     // Navigate to the search results on steam charts using game title as search term
//     await page.goto(`https://steamcharts.com/search/?q=${gameTitle}`);
//     try {
//       await page.click(".common-table a");
//       const recentAndPeakData = await page
//         .locator(".app-stat .num")
//         .allInnerTexts();

//       const monthlyAveragePlayers = await page
//         .locator(".odd .num-f")
//         .allInnerTexts();

//       const datesForAverageData = await page
//         .locator(".odd .month-cell")
//         .allInnerTexts();

//       const monthlyAverageData = [];
//       for (let i = 0; i < monthlyAveragePlayers.length; i++) {
//         monthlyAverageData.push({
//           average_players: monthlyAveragePlayers[i],
//           month: datesForAverageData[i],
//         });
//       }
//       monthlyAverageData.reverse();

//       const scrapingData = {
//         recentAndPeakData,
//         monthlyAverageData,
//       };
//       res.status(200).json(scrapingData);
//     } catch (error) {
//       console.log(error);
//       res
//         .status(404)
//         .json({ message: `Stats for title: ${gameTitle} not found` });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).json({ message: `Method ${req.method} not allowed` });
//   }
// };

// import puppeteer from "puppeteer";
// import puppeteer_core from "puppeteer-core";

let puppeteer: any;
let chromium = {};
if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  puppeteer = require("puppeteer-core");
  chromium = require("@sparticuz/chromium");
} else {
  puppeteer = require("puppeteer");
}
const { executablePath } = require("puppeteer");
const scrapeCharts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    let options = {};
    const gameTitle = req.body;
    const browser = await puppeteer.launch({
      ececutablePath: executablePath(),
    });
    const page = await browser.newPage();

    await page.goto(`https://steamcharts.com/search/?q=${gameTitle}`);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const searchResultSelector = ".common-table a";

    try {
      await page.waitForSelector(searchResultSelector);

      await page.click(searchResultSelector);

      const recentAndPeakData = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(".app-stat > .num"),
          (element) => element.textContent
        )
      );
      const monthlyAveragePlayers = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".odd > .num-f"), (element) =>
          parseFloat(element.textContent!.split(",").join(""))
        )
      );

      const datesForAverageData = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(".odd > .month-cell"),
          (element) => element.textContent
        )
      );

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

      await browser.close();
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