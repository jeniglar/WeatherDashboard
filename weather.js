$(document).ready(function () {


    $("#search").on("click", function (event) {
        event.preventDefault();

        var city = $("#city").val();
        var currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=168ede3fa90ff704eb0e8116151af527";

        $.ajax({
            url: currentWeatherQueryURL,
            method: "GET"
        }).then(function (response) {
            $("#city").text(JSON.stringify(response));
            console.log(response);
            $("#currentCity").text(response.name);

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            $("#temperature").text("Temperature: " + tempF.toFixed(2) + " °F");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");

            var uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?&appid=4983d208fd371cf8ba56cd03550e6ec5&q=&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvQueryURL,
                method: "GET"
            }).then(function (fiveDay) {
                $("#city").text(JSON.stringify(fiveDay));
                console.log(fiveDay);

            });

        });




    });



});