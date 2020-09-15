$(document).ready(function () {

    var city = JSON.parse(localStorage.getItem("cities")) || [];


    updatePage();

    $(".btn").on("click", function(event) {
        event.preventDefault();
        var location = $(this).siblings("#city").val();
        if(location === "") {
            return
        };
        city.push(location);
        saveCity(city);
        updatePage();
     });


    function updatePage() {
        $("#savedCities").empty();
        var location = JSON.parse(localStorage.getItem("cities"));
        for (var i = 0; i < location.length; i++) {
            var newCity = $("<li>").text(location[i]);
            $("#savedCities").append(newCity);
            console.log(location);
        }
    };

    function saveCity(newCity) {
        localStorage.setItem("cities", JSON.stringify(newCity));
    };

});