const request = require("request");



const geocode = (address, callback) => {
  const url = process.env.url1 + encodeURIComponent(address) + process.env.url2;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find given location,please try again", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};


module.exports = geocode;
