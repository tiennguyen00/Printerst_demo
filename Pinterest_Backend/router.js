var express = require("express");
var moment = require("moment");
var router = express.Router();

router
  .get("/", (req, res) => {
    res.render("index", {
      message: "Please enter a message",
      date: "Time will be show",
    });
  })
  .post("/", (req, res) => {
    res.render("index", {
      message: req.body.message,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
  });

module.exports = router;
