
$(document).ready(function(){

let numOfResults = 10;
let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";

queryURL += 
		$.param({
  			'term': 'food',
  			'open_now': true,
  			'limit': numOfResults
		});


$('#btn-search').on('click', function(){
	queryURL += ("&location=" + $('#zipcode').val());
	console.log(queryURL);

	$.ajax({
		method: 'GET',
	    beforeSend: function (xhr){ 
       		xhr.setRequestHeader('Authorization','Bearer rkh4n-57jLkGTS0E4ZAfvE-UPeERcuIbgie8qNA3NufkVmApUFeR6TSKICFHCOtSQLNIfVtul22q3lyPvcFGntFZQWs-rXZLkYGKHuHVkk8bI6_t9AQC2To03adBWnYx'); 	
    	},
		url: queryURL
	}).done(function(yelpResponse){
		console.log(yelpResponse);
		displayResults(yelpResponse);

	}).fail(function(err){
		console.log(err);
	});
});

function displayResults(yelpResponse){

	$.each(yelpResponse, function(key, value){
		console.log(yelpResponse.businesses);

		for(let i = 0; i < numOfResults; i++){
			let newDiv = $("<div>");
			newDiv.addClass("div-result");

			let newLoc =
			"<h3><a href='" + yelpResponse.businesses[i].url + "'>" + yelpResponse.businesses[i].name + "</h3>" +
			"<p>" + yelpResponse.businesses[i].display_phone + "</p>" +
			"<p class='lat-long'><a href='#'  data-latitude=" + yelpResponse.businesses[i].coordinates.latitude +
			" data-longitude=" + yelpResponse.businesses[i].coordinates.longitude + ">Show location om map</a></p>" ;			

			newDiv.html(newLoc);

			$("#content-results").append(newDiv);
		}
	});

}

$('#content-results').on('click', '.div-result', function(event){
	latitude = parseFloat($(this).find(".lat-long").find('a').attr('data-latitude'));
	longitude = parseFloat($(this).find(".lat-long").find('a').attr('data-longitude'));
	initMap();
});


});