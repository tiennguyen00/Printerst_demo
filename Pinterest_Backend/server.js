var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var routes = require("./router");

app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(3001);
