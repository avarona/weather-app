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
      var loc = response.loc.split(",").join(", ");
      $("#coords").html("<a href='" + google + "' target='_blank'>" + loc + "</a>");
  }, "jsonp");

// DATE & TIME
  var time = new Date().toLocaleString();   // date & time
  $("#date-time").html(time);
  var hour = new Date();    // day vs night
  hour = hour.getHours();

  switch(hour) {    // prepend hour icon
    case 1:
    case 13:
      $("#date-time").prepend("<i class='wi wi-time-1'></i> ");
      break;
    case 2:
    case 14:
      $("#date-time").prepend("<i class='wi wi-time-2'></i> ");
      break;
    case 3:
    case 15:
      $("#date-time").prepend("<i class='wi wi-time-3'></i> ");
      break;
    case 4:
    case 16:
      $("#date-time").prepend("<i class='wi wi-time-4'></i> ");
      break;
    case 5:
    case 17:
      $("#date-time").prepend("<i class='wi wi-time-5'></i> ");
      break;
    case 6:
    case 18:
      $("#date-time").prepend("<i class='wi wi-time-6'></i> ");
      break;
    case 7:
    case 19:
      $("#date-time").prepend("<i class='wi wi-time-7'></i> ");
      break;
    case 8:
    case 20:
      $("#date-time").prepend("<i class='wi wi-time-8'></i> ");
      break;
    case 9:
    case 21:
      $("#date-time").prepend("<i class='wi wi-time-9'></i> ");
      break;
    case 10:
    case 22:
      $("#date-time").prepend("<i class='wi wi-time-10'></i> ");
      break;
    case 11:
    case 23:
      $("#date-time").prepend("<i class='wi wi-time-11'></i> ");
      break;
    case 12:
    case 24:
      $("#date-time").prepend("<i class='wi wi-time-12'></i> ");
      break;
  }

// WEATHER & TEMPERATURE
  function temp(units) {
    var website = "http://api.openweathermap.org/data/2.5/weather?appid=5d87facb5c0056cee5c8975d500a58c7&units=" + "imperial" + "&zip=" + zip + "," + country;
    $.getJSON(website, function(json) {
      console.log(json);
      $("#temperature").html(json.main.temp);   // temperature
        // &#x2103   celsius
        // &#x2109   fahrenheit
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
          if(hour >= 6 && hour < 18) {
            $("#weather").html("<i class='wi wi-day-thunderstorm'></i>" + "<p>" + json.weather[0].description + "</p>");
          } else {
            $("#weather").html("<i class='wi wi-night-alt-thunderstorm'></i>" + "<p>" + json.weather[0].description + "</p>");
          }
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
          if(hour >= 6 && hour < 18) {
            $("#weather").html("<i class='wi wi-day-sprinkle'></i>" + "<p>" + json.weather[0].description + "</p>");
          } else {
            $("#weather").html("<i class='wi wi-night-alt-sprinkle'></i>" + "<p>" + json.weather[0].description + "</p>")
          }
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
          if(hour >= 6 && hour < 18) {
            $("#weather").html("<i class='wi wi-day-rain'></i>" + "<p>" + json.weather[0].description + "</p>");
          } else {
            $("#weather").html("<i class='wi wi-night-alt-rain'></i>" + "<p>" + json.weather[0].description + "</p>");
          }
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
          if(hour >= 6 && hour < 18) {
            $("#weather").html("<i class='wi wi-day-snow'></i>" + "<p>" + json.weather[0].description + "</p>");
          } else {
            $("#weather").html("<i class='wi wi-night-alt-snow'></i>" + "<p>" + json.weather[0].description + "</p>");
          }
          break;
        case 800:
          if(hour >= 6 && hour < 18) {
            $("#weather").html("<i class='wi wi-day-sunny'></i>" + "<p>" + json.weather[0].description + "</p>");
          } else {
            $("#weather").html("<i class='wi wi-night-alt-clear'></i>" + "<p>" + json.weather[0].description + "</p>");
          }
          break;
        case 801:
        case 802:
        case 803:
        case 804:
          if(hour >= 6 && hour < 18) {
            $("#weather").html("<i class='wi wi-day-cloudy'></i>" + "<p>" + json.weather[0].description + "</p>");
        } else {
            $("#weather").html("<i class='wi wi-night-alt-cloudy'></i>" + "<p>" + json.weather[0].description + "</p>");
        }
          break;
        default:
          $("#weather").html("There was an error... Please try again later");
      }
    });
  }

  setTimeout(temp, 1000);



});
