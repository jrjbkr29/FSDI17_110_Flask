

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationObtained);
    } 
    else {
        console.error("Browser does not support Geolocation");
    }
}

function locationObtained(position) {
    console.log("Current location: ", position);
    let data = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };

    $.ajax({
        url: "/api/weather",
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            console.log("Server says: ", res);
            currentWeather = "Current conditions: " + res.current.weather[0].description
            feelsLike= "Feels like: " + res.current.feels_like + " celsius"
            temp = "Current temperature: " + res.current.temp + " celsius"
            humidity = "Current humidity: " + res.current.humidity + "%"
            $("#weather-info").append(currentWeather)
            $("#temp").append(temp)
            $("#humidity").append(humidity)
            $("#feels-like").append(feelsLike)
        },
        error: function (details) {
            console.log("Error sending data", details);
        }
    });
}

function init() {
    getLocation();
}



window.onload = init;