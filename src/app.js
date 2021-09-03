const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // customized telling express where to look  kpg nagiba ng directory name
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // customized telling express where to look kpg nagiba ng directory name
hbs.registerPartials(partialsPath);

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Marivic Poniente',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Marivic Poniente',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'I will help you to answer all your questions',
    title: 'Help',
    name: 'Marivic Poniente',
  });
});

// app.get('', (req, res) => {
//   res.send('<h1>Hello Express!</h1>');
// });

// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Marivic',
//     age: 29,
//   });
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>');
// });

app.get('/Weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide as search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    name: 'Marivic Poniente',
    errorMessage: 'Help article not found',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Marivic Poniente',
    errorMessage: 'Page not found',
  });
});
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
