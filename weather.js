$(document).ready(function () {


    $("#search").on("click", function (event) {
        event.preventDefault();

        var currentDate = moment().format('l');
        var date1 = moment().add(1, 'days').format('l');
        var date2 = moment().add(2, 'days').format('l');
        var date3 = moment().add(3, 'days').format('l');
        var date4 = moment().add(4, 'days').format('l');
        var date5 = moment().add(5, 'days').format('l');

        $("#currentDate").text(currentDate + ")");
        $("#date1").text(date1);
        $("#date2").text(date2);
        $("#date3").text(date3);
        $("#date4").text(date4);
        $("#date5").text(date5);

        var city = $("#city").val();
        var currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=168ede3fa90ff704eb0e8116151af527";

        $.ajax({
            url: currentWeatherQueryURL,
            method: "GET"
        }).then(function (response) {
            $("#city").text(JSON.stringify(response));

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            $("#currentCity").text(response.name + " (");
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

                var tempFar1 = (JSON.stringify(fiveDay.daily[1].temp.day) - 273.15) * 1.80 + 32;
                $("#uvIndex").text("UV Index: " + fiveDay.current.uvi);
                $("#tempDay1").text("Temp: " + tempFar1.toFixed(2) + " °F");
                $("#humidityDay1").text("Humidity: " + (JSON.stringify(fiveDay.daily[1].humidity)) + "%");

                var tempFar2 = (JSON.stringify(fiveDay.daily[2].temp.day) - 273.15) * 1.80 + 32;
                $("#tempDay2").text("Temp: " + tempFar2.toFixed(2) + " °F");
                $("#humidityDay2").text("Humidity: " + (JSON.stringify(fiveDay.daily[2].humidity)) + "%");

                var tempFar3 = (JSON.stringify(fiveDay.daily[3].temp.day) - 273.15) * 1.80 + 32;
                $("#tempDay3").text("Temp: " + tempFar3.toFixed(2) + " °F");
                $("#humidityDay3").text("Humidity: " + (JSON.stringify(fiveDay.daily[3].humidity)) +"%");

                var tempFar4 = (JSON.stringify(fiveDay.daily[4].temp.day) - 273.15) * 1.80 + 32;
                $("#tempDay4").text("Temp: " + tempFar4.toFixed(2) + " °F");
                $("#humidityDay4").text("Humidity: " + (JSON.stringify(fiveDay.daily[4].humidity)) +"%");

                var tempFar5 = (JSON.stringify(fiveDay.daily[5].temp.day) - 273.15) * 1.80 + 32;
                $("#tempDay5").text("Temp: " + tempFar5.toFixed(2) + " °F");
                $("#humidityDay5").text("Humidity: " + (JSON.stringify(fiveDay.daily[5].humidity)) +"%");
  
            });

        });




    });



});