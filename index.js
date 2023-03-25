const express = require("express");
const app = express();
const crawlerRoute = require("./Route/crawler.router");
const ConcurrentRouter = require("./Route/concurrentCrawler.router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to the web crawler");
});
app.use(crawlerRoute);
app.use(ConcurrentRouter);

app.listen("8000", () => {
  console.log("Crawler server is up and running");
});
