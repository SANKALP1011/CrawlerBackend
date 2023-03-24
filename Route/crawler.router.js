const express = require("express");
const crawlerRouter = express.Router();
const { crawlUrl } = require("../Controller/crawler.controller");

crawlerRouter.get("/crawlUrl", crawlUrl);
module.exports = crawlerRouter;
