
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

		for(let i = 0; i < 10; i++){
			let newDiv = $("<div>");
			newDiv.addClass("div-result");

			let newLoc =
			"<h3>" + yelpResponse.businesses[i].name + "</h3>" +
			"<p>" + yelpResponse.businesses[i].display_phone + "</p>" +
			"<p><a href='" + yelpResponse.businesses[i].url +"''>link</a>";

			newDiv.html(newLoc);

			$("#content-results").append(newDiv);
		}
	});

}


});