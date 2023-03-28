const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  concurrentCrawler: async (req, res) => {
    let urls = req.query.urls;
    if (typeof urls !== "string") {
      urls = urls.toString();
    }
    urls = urls.split(",");
    try {
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const data = responses.map((response) => {
        const $ = cheerio.load(response.data);
        const title = $("title").text();
        const urlsToCrawl = $("a")
          .map((i, el) => $(el).attr("href"))
          .get()
          .filter((url) => url.startsWith("http"));
        const fileName = response.config.url
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase();
        return { title, urlsToCrawl, fileName };
      });
      await Promise.all(
        data.map(({ title, urlsToCrawl, fileName }) => {
          return new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(`${fileName}.json`);
            stream.write(JSON.stringify({ title, urlsToCrawl }, null, 2));
            stream.end();
            stream.on("finish", () => {
              console.log(`Saved ${fileName}.json`);
              resolve();
            });
            stream.on("error", reject);
          });
        })
      );
      console.log("All data saved");
      return res.status(200).json({
        Message: "Crawler is currently crawling , " + urls,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
