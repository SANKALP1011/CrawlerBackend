const express = require("express");
const app = express();
const crawlerRoute = require("./Route/crawler.router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to the web crawler");
});
app.use(crawlerRoute);

app.listen("8000", () => {
  console.log("Crawler server is up and running");
});
