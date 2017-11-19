jQuery(document).ready(function($) {
	console.log('DOM loaded!');

	//API details and other required variables
	var weatherAPIURL = "https://fcc-weather-api.glitch.me/api/current?";
	var lat, long, tempUnit = 'C';
	var currentTempInCel;
	var userLocationDiv = document.getElementById("userLocation");

	/**
	 * [getLocation method to get the location of user]
	 */
	 function getLocation() {
	 	console.log('in getLocation!');
	 	if (navigator.geolocation) {
	 		navigator.geolocation.getCurrentPosition(showPosition, showError);
	 	} else { 
	 		userLocationDiv.innerHTML = "Geolocation is not supported by this browser.";
	 	}
	 }

	/**
	 * [showPosition : method to display the coords of fetched location]
	 * @param  {[JSON Object]} position [accepts position JSON Object]
	 */
	 function showPosition(position) {
	 	console.log('in showPosition!');
	 	// userLocationDiv.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
	 	var lat = "lat=" + position.coords.latitude;
	 	var long = "lon=" + position.coords.longitude;
	 	getWeatherData(lat, long);
	 }

	/**
	 * [showError : method to display the error while fetching the user location]
	 * @param  {[JSON Object]} error [accepts the error object from geolocation API]
	 */
	 function showError(error) {
	 	console.log('in showError!');
	 	switch(error.code) {
	 		case error.PERMISSION_DENIED:
	 		userLocationDiv.innerHTML = "User denied the request for Geolocation."
	 		break;
	 		case error.POSITION_UNAVAILABLE:
	 		userLocationDiv.innerHTML = "Location information is unavailable."
	 		break;
	 		case error.TIMEOUT:
	 		userLocationDiv.innerHTML = "The request to get user location timed out."
	 		break;
	 		case error.UNKNOWN_ERROR:
	 		userLocationDiv.innerHTML = "An unknown error occurred."
	 		break;
	 	}
	 }

	/**
	 * [getWeatherData : method to get the weather data of given lat, long]
	 * @param  {[float]} lat  [accepts the lat for fetching the weather data]
	 * @param  {[float]} long [accepts the long for fetching the weather data]
	 */
	 function getWeatherData(lat, long) {
	 	console.log('in getWeatherData!');
	 	var urlStr = weatherAPIURL + lat + "&" + long;
	 	$.ajax({
	 		url: urlStr, success: function (result) {
	 			console.log('result=>', result);
	 			$("#cityCountry").text(result.name + ", " +result.sys.country);
	 			currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
	 			$("#tempDetails").text(currentTempInCelsius + " " + String.fromCharCode(176) + " " + tempUnit);
	 			$("#desc").text(result.weather[0].main);
	 			console.log('result.weather[0].icon=>', result.weather[0].icon);
	 			$("#weatherIcon").attr('src', result.weather[0].icon);
	 		}
	 	});
	 }

	 getLocation();


	});