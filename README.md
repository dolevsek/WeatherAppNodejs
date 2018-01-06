# WeatherAppNodejs

This app was created for a job interview task.
This is a node.js express REST API server that uses two API's - country API and weather API


There are  3 endpoints:
The first end point  includes a GET endpoint that returns a country list given a continent name (default continent is America)
(country API here https://restcountries.eu/)

The second endpoint, pulls the current weather state for each capital of the countries from the first end point (weather API- https://openweathermap.org/api) and return a sortable list (by Name) that contains Country Name, Capital, Weather  forecast (‘Clear’, ‘Cloudy’, ‘Rain’, etc) and the temperature in Celsius °.

The third endpoint uses the data that was acquired so far, and  gets a ‘type’ field (Continent Name) and a ‘filter’ field (Temperature range - min & max in Celsius° and Forecast enum) and returns the filtered results.

I used several libreries in this task, 'exprees', 'request' and 'body-parser'.
For testing I used mocha framework with 'chai'.

## Getting Started

1. Open CMD and nevigate to this project library

2. Write 'node server.js'

3. For the first end point, open your favorite browser and type on the address field:
'http://localhost:3001/api/v1/countries/:continent'
Replace ':continent' with any of this options {Africa, Americas, Asia, Europe, Oceania}
(if you enter anything else, it will use the defualt)

4. For the second end point, type on the address field: 'http://localhost:3001/api/v1/weather/'

5. For the third end point, I used postman https://www.getpostman.com/.
post a JSON like in the example below the explantion.

### Examples:
1. For the first end point enter: 'http://localhost:3001/api/v1/countries/Africa'
2. for the third end point enter JSON in this structure:
{
    "type": "Africa",
    "filter":
        {
            "temp":
            {
                "min":10,
                "max":50
            },
            "weather":
                ["Rain"]
        }
}

## Running the tests

To run the test you should install mocha and chai.
1. Open CMD and nevigate to this project library
2. Write 'npm test'



# WeatherAppNodejs
