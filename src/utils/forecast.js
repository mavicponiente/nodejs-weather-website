const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=7f8e59a8002764baf4f863d1216af59f&query=' +
    longitude +
    ',' +
    latitude +
    ' &units=f';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find locations!', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degress out. It feels like ' +
          body.current.feelslike +
          ' degrees out. ' +
          'The humidity is at ' +
          body.current.humidity +
          ' degrees celsius.'
      );
    }
  });
};

module.exports = forecast;
