const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const initRoute = require("./routes/index.route");
const BaseError = require("./utils/error-handling/baseError");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

initRoute(app);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("<<<<< Connected to database");
  })
  .catch((err) => {
    console.log("🚀 ~ file: index.js:38 ~ err:", err);
  });

app.listen(PORT, () =>
  console.log(`>>>>> User service is running on port ${PORT}}.`)
);

// Catch All Unhandled Promise Rejections
process.on("unhandledRejection", (error) => {
  throw error;
});

// Catch All Uncaught Exceptions
process.on("uncaughtException", (error) => {
  console.log("🚀 ~ file: index.js:43 ~ process.on ~ error:", error);

  if (!(error instanceof BaseError)) {
    process.exit(1);
  }
});
