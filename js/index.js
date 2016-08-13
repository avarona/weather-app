$(document).ready(function() {

// LOCATION GEOLOCATION
  /*
  var lat, lon;
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    $("#coords").append(lat + ", " + lon);
  });
*/
// LOCATION IP ADDRESS
var city = "";
  $.get("http://ipinfo.io", function(response) {
      $("#city").html("<h3>" + response.city + ", " + response.region + "<br>" + response.country);
      city = response.city;
      $("#coords").html(response.loc).css("font-size", "12px");
  }, "jsonp");

// FUNCTION WEATHER APP
  function temp() {
    var units = "imperial";
    var website = "http://api.openweathermap.org/data/2.5/weather?appid=5d87facb5c0056cee5c8975d500a58c7&units=" + units + "&q=" + city;

    $.getJSON(website, function(json) {
      console.log(json);
      $("#temp").html(json.main.temp);
    });
  }
//&#x2103   celsius
  setTimeout(temp, 1000);


});
