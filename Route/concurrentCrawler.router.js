const express = require("express");
const ConcurrentRouter = express.Router();
const {
  concurrentCrawler,
} = require("../Controller/concurrentCrawler.controller");

ConcurrentRouter.get("/concurrentCrawlUrl", concurrentCrawler);
module.exports = ConcurrentRouter;
