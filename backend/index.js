const express = require("express");
const cors = require("cors");
const axios = require("axios");
const _ = require("lodash");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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

app.get("/", async (req, res) => {
  const city = "Delhi";
  const url_api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=655688ef8fcb818d223817edb8b01a39&units=metric";

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
        });
      } else {
        const temperature = Math.round(response.data.main.temp);
        const main = _.upperFirst(response.data.weather[0].main);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const url_icon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.send({
          city: city,
          temp: temperature,
          status: main,
          today: today,
          url_icon: url_icon,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).send({ message: "something went wrong" });
    }
  });

  // res.send({
  //   city: "delhi",
  //   temp: "null",
  //   status: "null",
  //   today: "null",
  //   url_icon: "null",
  // });
});

app.post("/", (req, res) => {
  // const API_KEY = "655688ef8fcb818d223817edb8b01a39";
  const city = _.upperFirst(req.body.city);
  if (!city) {
    throw new Error("Enter valid city");
  }
  const url_api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=655688ef8fcb818d223817edb8b01a39&units=metric";

  axios.get(url_api).then((response) => {
    try {
      if (response.data.cod == "404") {
        city = response.data.message;

        res.send({
          city: city,
          temp: null,
          status: null,
          today: null,
          url_icon: null,
        });
      } else {
        const temperature = Math.round(response.data.main.temp);
        const main = _.upperFirst(response.data.weather[0].main);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const url_icon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.send({
          city: city,
          temp: temperature,
          status: main,
          today: today,
          url_icon: url_icon,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).send({ message: "something went wrong" });
    }
  });
});

app.listen(port, () => {
  console.log("server is on port " + port);
});
