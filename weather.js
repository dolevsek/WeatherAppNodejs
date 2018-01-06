var request = require('request');

var key="879d0708110e5d7594395c0e35cfef16";
var defaultContinent = 'Americas';
var countryList;
var responses = [];
const continentEnum = new Set(['Africa', 'Americas', 'Americas',"Asia","Europe","Oceania"]);


//-----------------------------------endPoints----------------------------------------------


exports.searchCountriesByContinent = function(req, res) {
	var continent = req.params.continent; 
	if (continentEnum.has(continent)) defaultContinent=continent;
	var url = 'https://restcountries.eu/rest/v2/region/' + defaultContinent;
	request(url, function (error, response, body) {
	if ((response.statusCode != 200) || error) {
	  console.log('error:', error); 
	  var buildResponse=buildRespond("error",404,body)
	  res.send(buildResponse);
	} 
	else {
		countryList=JSON.parse(body);
		var buildResponse=buildRespond("The request completed",200,countryList);
	  	res.status(200).send(buildResponse);
	}
	});
}

exports.searchWeatherOfCapital = function(req, res) {
	var urls=[];
	var completed_requests = 0;
	var error_requests=0;
	
	for (i=0; i<countryList.length;i++){
		city=countryList[i].capital;
		urls.push('http://api.openweathermap.org/data/2.5/weather?q='+city +'&appid='+key);
	}

	for (i in urls) {
		(function(obj){
			request(urls[i], function(error, response, body) {
				if ((response.statusCode != 200) || error) {
					error_requests++;
				}
				else {	
					var data={};
					var response_processed=JSON.parse(response.body);
					var temp=Number(response_processed.main.temp)-273.15;

					data={"Country":obj.name,"Capital":response_processed.name, "Weather":response_processed.weather[0].main, "Celsius":temp};
					responses.push(data);
					completed_requests++;
					
					if (error_requests+completed_requests == urls.length) {
						message="The request completed with " +error_requests+ " errors out of " + urls.length;
						responses=sortFunc(responses);
						var buildResponse=buildRespond(message,200,responses);
						res.status(200).send(buildResponse);
					}
				}
			});
		})(countryList[i])
	}
}

exports.filterSearchedData = function(req, res) {
	var arg=req.body;
    var filter =arg.filter;
    if (defaultContinent!=arg.type) return res.status(200).send(buildRespond("No data about this continent",404));
    var ans=responses.filter(filterFunc,filter);
	var buildResponse=buildRespond("The request completed",200,ans);
	res.status(200).send(buildResponse);
}

//-----------------------------------Helpers----------------------------------------------

function filterFunc(obj){
	if (!(this.temp.min<obj.Celsius && obj.Celsius<this.temp.max)) return false;
	if (!(this.weather.includes(obj.Weather))) return false;
	return true;  
}

function sortFunc(unordered){
	
	unordered.sort(function(first, second) {
	        var x = first.Country.toLowerCase();
    		var y = second.Country.toLowerCase();
    		if (x < y) {return -1;}
    		if (x > y) {return 1;}
   			return 0;
		});

	return unordered;
}

function buildRespond(message,status,body){
	return {
	   		message: message,
	   		status: status,
	    	body: body
	    	};
}