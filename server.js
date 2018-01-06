var express = require('express');
var handler = require('./weather.js');
var bodyParser =require("body-parser");



var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static')); 




app.get('/api/v1/countries/:continent', handler.searchCountriesByContinent);
app.get('/api/v1/weather/', handler.searchWeatherOfCapital);
app.post('/api/v1/filter', handler.filterSearchedData);



app.listen(3001);
console.log('Listening on port 3001...');


