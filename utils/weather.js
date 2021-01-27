const request = require("request");

const weather = (address, callback) => {
  const url = process.env.wApi + encodeURIComponent(address);

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback(
        {
          error: body.error.info,
        },
        undefined
      );
    } else {
      callback(undefined, {
        temp: body.current.temperature,
        feelsLike: body.current.feelslike,
        location: body.location.name,
        weatherD: body.current.weather_descriptions[0],
        windSpeed: body.current.wind_speed,
        img: body.current.weather_icons[0],
      });
    }
  });
};

module.exports = weather;
