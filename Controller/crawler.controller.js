const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  crawlUrl: async (req, res) => {
    const url = req.query.urL;
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const title = $("title").text();
      const paragraphs = $("p")
        .map((i, el) => $(el).text())
        .get();
      const data = {
        title,
        paragraphs,
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


links = {
  'https://en.wikipedia.org/wiki/PageRank': ['https://en.wikipedia.org/wiki/Google', 'https://en.wikipedia.org/wiki/Hyperlink'],
  'https://en.wikipedia.org/wiki/Google': ['https://en.wikipedia.org/wiki/PageRank', 'https://en.wikipedia.org/wiki/Search_engine'],
  'https://en.wikipedia.org/wiki/Hyperlink': ['https://en.wikipedia.org/wiki/PageRank', 'https://en.wikipedia.org/wiki/Web_page'],
  'https://en.wikipedia.org/wiki/Search_engine': ['https://en.wikipedia.org/wiki/Google', 'https://en.wikipedia.org/wiki/Web_search_engine']
}

