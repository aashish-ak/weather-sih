const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config')
const app = express()

const apiKey = '7860091c0befcad185e605ee6133e50e';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('home');
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log('*'*50)
        console.log(weather);
        console.log('*'*50)
        var weatherobj = {
            city : weather.name,
            temperature : (weather.main.temp),
		        temp_max : (weather.main.temp_max),
		        temp_min : (weather.main.temp_min),
            description : weather.weather[0].description,
            icon : weather.weather[0].icon
        };
        res.render('index', {weather: weatherobj, error: null});
      }
    }
  });
})

app.listen(config.PORT, function () {
  console.log('Weather app listening on port ' + config.PORT);
})
