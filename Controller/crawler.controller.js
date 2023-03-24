const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = {
  crawlUrl: async (req, res) => {
    const url = req.query.urL;
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      // use Cheerio selectors to extract data from the response
      // for example:
      const title = $("title").text();
      const paragraphs = $("p")
        .map((i, el) => $(el).text())
        .get();
      // create an object to store the data
      const data = {
        title,
        paragraphs,
      };
      // write the data to a file using a writable stream
      const fileName = url.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const stream = fs.createWriteStream(`${fileName}.json`);
      stream.write(JSON.stringify(data, null, 2));
      stream.end();
      stream.on("finish", () => {
        console.log(`Saved ${url} to ${fileName}.json`);
      });
    } catch (error) {
      console.error(error);
    }
  },
};
