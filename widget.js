"use strict";

//on click, creates http request and parses json file if file is found
document.getElementById("submit").addEventListener("click", function () {
	var input = document.getElementById("zip").value;
	document.getElementById("city").value = "";
	document.getElementById("state").value = "";
	document.getElementById("error").innerHTML = "";

	if(isValidZip(input)) {
		var url = "postalcodes/"+ input +".json";
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
		  if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
		    var data = JSON.parse(xmlhttp.responseText);
		    zipSearch(data);
		  }
		    //zip code not found error 
		  else if(xmlhttp.status === 404) {
		    document.getElementById("error").innerHTML = "ZIP code " + input + " was not found.";
		    document.getElementById("zip").value = "";
		  }
		};
		
    xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
	else {
		//incorrect user entry error
		document.getElementById("error").innerHTML = "\"" + input + "\"" + " is not a valid ZIP code. Please enter again (e.g. 02120).";
		document.getElementById("zip").value = "";
	}

});

//checks if user input is a 5 digit zip code
function isValidZip(input) {
  return (/^\d{5}$/).test(input);
}

//writes city and state from json file 
function zipSearch(data) {
  var city = data.place_name;
  var state = data.admin_name1;
  document.getElementById("city").value = city;
  document.getElementById("state").value = state; 
}