jQuery(document).ready(function($) {
	console.log('DOM loaded!');
	
	var userLocationDiv = document.getElementById("userLocation");

	function getLocation() {
	console.log('in getLocation!');
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else { 
			userLocationDiv.innerHTML = "Geolocation is not supported by this browser.";
		}
	}

	function showPosition(position) {
		userLocationDiv.innerHTML = "Latitude: " + position.coords.latitude + 
		"<br>Longitude: " + position.coords.longitude;
	}

	function showError(error) {
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

	getLocation();


});