

function getLocation() {
    console.log("get location func");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationObtained);
    } 
    else {
        console.error("Browser does not support Geolocation");
    }
}

function locationObtained(position) {
    console.log("Current location", position);
    console.log("location obt func");
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
        },
        error: function (details) {
            console.log("Error sending data", details);
        }
    });

    console.log("after ajax request");
}

function init() {
    console.log("Flask Page");

    getLocation();
}



window.onload = init;