import puppeteer from "puppeteer";

const scrapeCharts = async (req: any, res: any) => {
  if (req.method === "POST") {
    const gameTitle = req.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://steamcharts.com/search/?q=${gameTitle}`);
    console.log(gameTitle);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    // await page.type(".search-box__input", "automate beyond recorder");

    // Wait and click on first result
    const searchResultSelector = ".common-table a";
    try {
      await page.waitForSelector(searchResultSelector);
      console.log(searchResultSelector);
      await page.click(searchResultSelector);

      // Locate the full title with a unique string
      const textSelector = await page.waitForSelector(".num");
      const fullTitle = await textSelector.evaluate((el) => el.textContent);
      const recentAndPeakData = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(".app-stat > .num"),
          (element) => element.textContent
        )
      );
      const monthlyAveragePlayers = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(".odd > .num-f"),
          (element) => element.textContent
        )
      );
      const datesForAverageData = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(".odd > .month-cell"),
          (element) => element.textContent
        )
      );

      const monthlyAverageData = {
        monthlyAveragePlayers,
        datesForAverageData,
      };
      // Print the full title
      const scrapingData = {
        recentAndPeakData,
        monthlyAverageData,
      };
      console.log(scrapingData);

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
