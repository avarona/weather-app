$(document).ready(function() {
// LOCATION IP ADDRESS
  /*
    var zip, country;
    $.get("http://ipinfo.io", function(response) {
        $("#city").html("<h3>" + response.city + ", " + response.region + "<br>" + response.country);
        zip = response.postal;
        country = response.country;
        var google = "https://www.google.com/search?q=" + response.loc + "&ie=utf-8&oe=utf-8";
        var loc = response.loc.split(",").join(", ");
        $("#coords").html("<a href='" + google + "' target='_blank'>" + loc + "</a>");
    }, "jsonp");
  */

// ASK FOR GEOLOCATION
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude, longitude, googleCoords;
      lat = position.coords.latitude.toFixed(6);
      lon = position.coords.longitude.toFixed(6);
      googleCoords = lat + "," + lon;

      var googleAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + googleCoords + "&key= AIzaSyDt0p9nUfXbTs5gCAEqdokhsV_UEgkx_50";

      $.getJSON(googleAPI, function(json) {
          var address, zip, country;
          address = json.results[0].formatted_address.split(",");
          zip = address[2].split(" ")[2];
          country = address[3].replace(/\s/g, '');
          $("#city").html(address[1] + ", " + address[2].split(" ")[1]);
          $("#coords").html("<a href='https://www.google.com/search?q=" + googleCoords + "' target='_blank'>" + lat + ", " + lon + "</a>");

// DATE & TIME
      var time = new Date().toString();  // date & time
      time = time.split(" ");
      $("#time").html(time[4] + " | " + time[1] + " " + time[2] + ", " + time[3]);

      var hour = new Date();      // hour of the day
      hour = hour.getHours();
      switch(hour) {            // prepend hour icon
      case 1:
      case 13:
        $("#time").prepend("<i class='wi wi-time-1'></i> ");
        break;
      case 2:
      case 14:
        $("#time").prepend("<i class='wi wi-time-2'></i> ");
        break;
      case 3:
      case 15:
        $("#time").prepend("<i class='wi wi-time-3'></i> ");
        break;
      case 4:
      case 16:
        $("#time").prepend("<i class='wi wi-time-4'></i> ");
        break;
      case 5:
      case 17:
        $("#time").prepend("<i class='wi wi-time-5'></i> ");
        break;
      case 6:
      case 18:
        $("#time").prepend("<i class='wi wi-time-6'></i> ");
        break;
      case 7:
      case 19:
        $("#time").prepend("<i class='wi wi-time-7'></i> ");
        break;
      case 8:
      case 20:
        $("#time").prepend("<i class='wi wi-time-8'></i> ");
        break;
      case 9:
      case 21:
        $("#time").prepend("<i class='wi wi-time-9'></i> ");
        break;
      case 10:
      case 22:
        $("#time").prepend("<i class='wi wi-time-10'></i> ");
        break;
      case 11:
      case 23:
        $("#time").prepend("<i class='wi wi-time-11'></i> ");
        break;
      case 12:
      case 24:
        $("#time").prepend("<i class='wi wi-time-12'></i> ");
        break;
    }

// TEMPERATURE & WEATHER
      var units;           // input units by country
      if(country == "USA") {
        units = "imperial";
        $("#degree").html("<a href='#'> &#x2109</a>");
      } else {
        units = "metric";
        $("#degree").html("<a href='#'> &#x2103</a>");
      }

      var website = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?appid=5d87facb5c0056cee5c8975d500a58c7&units=" + units + "&zip=" + zip + "," + country;
      $.getJSON(website, function(json) {
        console.log(json);
        $("h1").fadeIn(200).html("Weather App").css("font-size", "48px");
        var temperature = json.main.temp;
        $("#temp").html(json.main.temp);   // temperature
        var toggle = units;           // degree toggle
        $("#degree").click(function() {
          if(toggle == "imperial") {
            temperature = (temperature - 32) * 5 / 9;
            toggle = "metric";
            $("#temp").html(temperature.toFixed(2));
            $("#degree").html("<a href='#'> &#x2103</a>");
          } else if(toggle == "metric") {
            temperature = (temperature * 9 / 5) + 32;
            toggle = "imperial";
            $("#temp").html(temperature.toFixed(2));
            $("#degree").html("<a href='#'> &#x2109</a>");
          }
        });
        switch(json.weather[0].id) {   // weather icons & desc
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
            $("body").animate({backgroundColor: "#1A858E"});
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
            $("body").animate({backgroundColor: "#86888A"});
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
            $("body").animate({backgroundColor: "#00AEB3"});
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
            $("body").animate({backgroundColor: "#A9DDDD"});
            if(hour >= 6 && hour < 18) {
              $("#weather").html("<i class='wi wi-day-snow'></i>" + "<p>" + json.weather[0].description + "</p>");
            } else {
              $("#weather").html("<i class='wi wi-night-alt-snow'></i>" + "<p>" + json.weather[0].description + "</p>");
            }
            break;
          case 800:
            if(hour >= 6 && hour < 18) {
              $("body").animate({backgroundColor: "#68C7EC"});
              $("#weather").html("<i class='wi wi-day-sunny'></i>" + "<p>" + json.weather[0].description + "</p>");
            } else {
              $("body").animate({backgroundColor: "#0B4971"});
              $("#weather").html("<i class='wi wi-night-clear'></i>" + "<p>" + json.weather[0].description + "</p>");
            }
            break;
          case 801:
          case 802:
          case 803:
          case 804:
            $("body").animate({backgroundColor: "#B3B5B7"});
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

    });

  });
});
