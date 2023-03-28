const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  crawlUrl: async (req, res) => {
    const url = req.query.urL;
    console.log(url);
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const title = $("title").text();
      const urlsToCrawl = $("a")
        .map((i, el) => $(el).attr("href"))
        .get()
        .filter((url) => url.startsWith("http" | "https"));

      const data = {
        title,
        urlsToCrawl,
      };

      const fileName = url.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const stream = fs.createWriteStream(`${fileName}.json`);
      stream.write(JSON.stringify(data, null, 2));
      stream.end();
      stream.on("finish", () => {
        console.log(`Saved ${url} to ${fileName}.json`);
      });

      return res.status(200).json({
        Message: "Crawler is currently crawling , " + url,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
