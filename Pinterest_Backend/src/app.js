import express from "express";
import mongoose from "mongoose";
import logging from "./core/logging";
import database from "./config/database";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import createError from "http-errors";

import { routes } from "./routers/index";
import cors from "cors";
import { RouteConstant } from "./constant/Routes";
import * as bodyParser from "body-parser";
import serveIndex from "serve-index";
const request = require("request");

//Setup config
const NAMESPACE = "Server";

//Setup connect mongodb
mongoose
  .connect(database.mongo.url, database.mongo.options)
  .then((result) => logging.info(NAMESPACE, "Connected to MongoDB!"))
  .catch((error) => logging.error(NAMESPACE, error.message, error));

//Setup express
let app = express();
//CORS
const corsOptions = {
  origin: "http://localhost:3000", // Server Client
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
// logger morgan
app.use(morgan("dev"));
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use cookie
app.use(cookieParser());
// setup folder contain assets
// app.use(express.static((path.join(__dirname, 'public'))))
// app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));
// app.use(express.json({limit: '50mb'}));

// --START--    App routers
app.use(RouteConstant.USER, routes.user);
app.use(RouteConstant.FILE, routes.file);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render('error')
  res.json({ error: err });
});

// Setup server
const port = process.env.PORT || 3000;
app.set("port", port);
export default app;
