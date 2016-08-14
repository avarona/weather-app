$(document).ready(function() {

// ASK FOR GEOLOCATION
  /*
  var lat, lon;
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    $("#coords").append(lat + ", " + lon);
  });
*/

// LOCATION IP ADDRESS
var zip = "";
var country = "";
  $.get("http://ipinfo.io", function(response) {
      $("#city").html("<h3>" + response.city + ", " + response.region + "<br>" + response.country);
      zip = response.postal;
      country = response.country;
      var google = "https://www.google.com/search?q=" + response.loc + "&ie=utf-8&oe=utf-8";
      $("#coords").html("<a href='" + google + "' target='_blank'>" + response.loc + "</a>");
  }, "jsonp");

// DATE & TIME
  var time = new Date().toLocaleString();
  $("#date-time").html(time);
  console.log(time);
  var arr = time.split(" ");

// FUNCTION WEATHER APP
  function temp(units) {
    var website = "http://api.openweathermap.org/data/2.5/weather?appid=5d87facb5c0056cee5c8975d500a58c7&units=" + "imperial" + "&zip=" + zip + "," + country;
    console.log(website);

    $.getJSON(website, function(json) {
      console.log(json);
      $("#temperature").html(json.main.temp);   // temperature
      switch(json.weather[0].id) {      // weather icons
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          $("#weather").html("<h3>" + json.weather[0].description + "</h3><i class='wi wi-day-thunderstorm'></i>");
          break;
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          $("#weather").html("<h3>" + json.weather[0].description + "</h3><i class='wi wi-day-sprinkle'></i>");
          break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
          $("#weather").html("<h3>" + json.weather[0].description + "</h3><i class='wi wi-day-rain'></i>");
          break;
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
          $("#weather").html("<h3>" + json.weather[0].description + "</h3><i class='wi wi-day-snow'></i>");
          break;
        case 800:
          $("#weather").html("<h3>" + json.weather[0].description + "</h3><i class='wi wi-day-sunny'></i>");
          break;
        case 801:
        case 802:
        case 803:
        case 804:
          $("#weather").html("<h3>" + json.weather[0].description + "</h3><i class='wi wi-day-sunny'></i>");
          break;
        default:
          $("#weather").html("There was an error... Please try again later");
      }
    });
  }
//&#x2103   celsius
//&#x2109   fahrenheit
  setTimeout(temp, 1000);



});
