const express = require("express");
const cors = require("cors");
const axios = require("axios");
const _ = require("lodash");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

var today = day + " " + months[month] + " " + year;

app.get("/api", async (req, res) => {
  const city = "Delhi";
  const url_api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    process.env.REACT_APP_SECRET_KEY +
    "&units=metric";

  axios.get(url_api).then((response) => {
    try {
      if (response.data.cod == "404") {
        city = "delhi";

        res.send({
          city: city,
          temp: null,
          status: null,
          today: null,
          url_icon: null,
          speed: null,
          humidity: null,
          visibility: null,
          pressure: null,
          feels_like: null,
        });
      } else {
        const temperature = Math.round(response.data.main.temp);
        const main = _.upperFirst(response.data.weather[0].main);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const url_icon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const speed = response.data.wind.speed;
        const humidity = response.data.main.humidity;
        const visibility = response.data.visibility;
        const pressure = response.data.main.pressure;
        const feels_like = response.data.main.feels_like;
        console.log(speed, humidity);
        res.send({
          city: city,
          temp: temperature,
          status: description,
          today: today,
          url_icon: url_icon,
          speed: speed,
          humidity: humidity,
          visibility: visibility,
          pressure: pressure,
          feels_like: feels_like,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).send({ message: "something went wrong" });
    }
  });
});

app.post("/", async (req, res) => {
  const city = _.upperFirst(req.body.city);
  if (!city) {
    throw new Error("Enter valid city");
  }
  const url_api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    process.env.REACT_APP_SECRET_KEY +
    "&units=metric";
  axios.get(url_api).then((response) => {
    try {
      if (response.data.cod == "404") {
        city = response.data.message;

        res.send({
          city: city,
          temp: "null",
          status: "null",
          today: "null",
          url_icon: "null",
          speed: "null",
          humidity: "null",
          visibility: "null",
          pressure: "null",
          feels_like: "null",
        });
      } else {
        const temperature = Math.round(response.data.main.temp);
        const main = _.upperFirst(response.data.weather[0].main);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const url_icon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const speed = response.data.wind.speed;
        const humidity = response.data.main.humidity;
        const visibility = response.data.visibility;
        const pressure = response.data.main.pressure;
        const feels_like = response.data.main.feels_like;
        res.send({
          city: city,
          temp: temperature,
          status: main,
          today: today,
          url_icon: url_icon,
          speed: speed,
          humidity: humidity,
          visibility: visibility,
          pressure: pressure,
          feels_like: feels_like,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).send({ message: "something went wrong" });
    }
  });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log("server is on port " + port);
});
