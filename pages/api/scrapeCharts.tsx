import puppeteer from "puppeteer";

const scrapeCharts = async (req: any, res: any) => {
  if (req.method === "POST") {
    const gameTitle = req.body;
    const browser = await puppeteer.launch();
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
