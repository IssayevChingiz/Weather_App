const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("../utils/geocode");
const weather = require("../utils/weather");

const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "../public");
const app = express();
const viewsPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDir));
hbs.registerPartials(partials);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Chingiz Issayev",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address provided",
    });
  }

  geocode(req.query.address, (error, { location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    weather(
      location,
      (error, { temp, feelsLike, location, weatherD, windSpeed, img } = {}) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          temperature: temp,
          feelsLike: feelsLike,
          location: location,
          weatherDesc: weatherD,
          wind_speed: windSpeed,
          img: img,
        });
      }
    );
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page ",
    creator: "Chingiz Issayev",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    sms: "404",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "tobe forecasted",
    location: "location to be set",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
