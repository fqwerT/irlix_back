const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const router = require("./router/router.js");
const bodyParser = require('body-parser')
require("dotenv").config(); //чтение переменных окружения из файла

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(cookie_parser());
app.use(cors());
app.use("/api", router);

const AppStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(`Something went wrong ${err}`);
  }
};

AppStart();
