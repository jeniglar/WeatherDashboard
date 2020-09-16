$(document).ready(function () {

    var history = JSON.parse(localStorage.getItem("cities")) || [];
    updatePage();

    function updatePage() {
        $("#savedCities").empty();
        for (var i = 0; i < history.length; i++) {
            var newCity = $("<button>").text(history[i]);
            newCity.addClass("cityButton");
            $("#savedCities").append(newCity);
            console.log(history);
        }
    };
    
    function saveCity(newCity) {
        localStorage.setItem("cities", JSON.stringify(newCity));
    };

    function searchCity(city) {

        var currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=168ede3fa90ff704eb0e8116151af527";
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
        
        $.ajax({
            url: currentWeatherQueryURL,
            method: "GET"
        }).then(function (weatherData) {
            $("#city").text(JSON.stringify(weatherData));

            var tempF = (weatherData.main.temp - 273.15) * 1.80 + 32;
            var lat = weatherData.coord.lat;
            var lon = weatherData.coord.lon;
            var currentWeatherIcon = weatherData.weather[0].icon;

            $("#currentCity").text(weatherData.name + " (");
            $("#temperature").text("Temperature: " + tempF.toFixed(2) + " °F");
            $("#humidity").text("Humidity: " + weatherData.main.humidity + "%");
            $("#windSpeed").text("Wind Speed: " + weatherData.wind.speed + " MPH");
            $("#currentWeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");

            var uvQueryURL = "https://api.openweathermap.org/data/2.5/onecall?&appid=4983d208fd371cf8ba56cd03550e6ec5&q=&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvQueryURL,
                method: "GET"
            }).then(function (fiveDay) {
                $("#city").text(JSON.stringify(fiveDay));
                var day1WeatherIcon = fiveDay.daily[1].weather[0].icon;
                var day2WeatherIcon = fiveDay.daily[2].weather[0].icon;
                var day3WeatherIcon = fiveDay.daily[3].weather[0].icon;
                var day4WeatherIcon = fiveDay.daily[4].weather[0].icon;
                var day5WeatherIcon = fiveDay.daily[5].weather[0].icon;

                $("#day1WeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + day1WeatherIcon + "@2x.png");
                $("#day2WeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + day2WeatherIcon + "@2x.png");
                $("#day3WeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + day3WeatherIcon + "@2x.png");
                $("#day4WeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + day4WeatherIcon + "@2x.png");
                $("#day5WeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + day5WeatherIcon + "@2x.png");

                var tempFar1 = (JSON.stringify(fiveDay.daily[1].temp.day) - 273.15) * 1.80 + 32;
                $("#uvIndex").text("UV Index: " + fiveDay.current.uvi);
                $("#tempDay1").text("Temp: " + tempFar1.toFixed(2) + " °F");
                $("#humidityDay1").text("Humidity: " + (JSON.stringify(fiveDay.daily[1].humidity)) + "%");

                var tempFar2 = (JSON.stringify(fiveDay.daily[2].temp.day) - 273.15) * 1.80 + 32;
                $("#tempDay2").text("Temp: " + tempFar2.toFixed(2) + " °F");
                $("#humidityDay2").text("Humidity: " + (JSON.stringify(fiveDay.daily[2].humidity)) + "%");

                var tempFar3 = (JSON.stringify(fiveDay.daily[3].temp.day) - 273.15) * 1.80 + 32;
                $("#tempDay3").text("Temp: " + tempFar3.toFixed(2) + " °F");
                $("#humidityDay3").text("Humidity: " + (JSON.stringify(fiveDay.daily[3].humidity)) + "%");

                var tempFar4 = (JSON.stringify(fiveDay.daily[4].temp.day) - 273.15) * 1.80 + 32;
                $("#tempDay4").text("Temp: " + tempFar4.toFixed(2) + " °F");
                $("#humidityDay4").text("Humidity: " + (JSON.stringify(fiveDay.daily[4].humidity)) + "%");

                var tempFar5 = (JSON.stringify(fiveDay.daily[5].temp.day) - 273.15) * 1.80 + 32;
                $("#tempDay5").text("Temp: " + tempFar5.toFixed(2) + " °F");
                $("#humidityDay5").text("Humidity: " + (JSON.stringify(fiveDay.daily[5].humidity)) + "%");

                function uvColor() {
                    var uv = fiveDay.current.uvi;
                    var low = 2
                    var high = 7
                    console.log(uv);
                    $("#uvIndex").attr("class","");
                    if (uv < low) {
                        $("#uvIndex").addClass("uvLow");
                    } else if (uv > high) {
                        $("#uvIndex").addClass("uvHigh");
                    } else {
                        $("#uvIndex").addClass("uvMid");
                    };
                };

                uvColor();
            });
        });
    }

    $(document).on("click", ".cityButton", function(event){
        event.preventDefault();
        searchCity($(this).text());
    })

    $("#search").on("click", function (event) {
        event.preventDefault();
        var location = $(this).siblings("#city").val();
        if (location === "") {
            return
        };
        history.push(location);
        saveCity(history);
        updatePage();

        var city = $("#city").val();
        searchCity(city);
    });
});