var openWeather = "https://api.openweathermap.org/data/2.5/weather?zip=";
var api = ",us&appid=ef793b28293bd23594d9d0f629c4e273";

// Declarations
var self = this;
var loc = document.getElementById('loc');
var temp = document.getElementById('temperature');
var tempCelsius = document.getElementById('tempCelsius');
var tempFarenheit = document.getElementById('tempFarenheit');
var condition = document.getElementById('condition');
var weatherIcon = document.getElementById('weatherIcon');

// Async Fill Document
function findWeather() {
    var zip = document.getElementById('zipValue').value;
    var requestURL = openWeather + zip.toString() + api;

    // Get JSON and check if valid
    var g = fetch(requestURL).then(function(x) {
        console.log(x.status);
        if (x.status === 404) {
            $('.toast').toast('show');
            $('.card').addClass('d-none');
        } else {
            $('.toast').toast('hide');
            $('.card').removeClass('d-none');
            return x;
        }
    })
        .then(
            function (response) {
                console.log(response);
                return response.json();
            }
        )
        // Fill in HTML with Weather Info
        .then(function (weatherData) {
            self.loc.innerHTML = weatherData.name;
            var tempStore = Math.round(weatherData.main.temp);
            self.temp.innerHTML = tempStore + "K";
            tempStore = Math.round(tempStore - 273.15);
            self.tempCelsius.innerHTML = tempStore + "°C";
            tempStore = Math.round((tempStore * 9 / 5) + 32);
            self.tempFarenheit.innerHTML = tempStore + "°F";
            self.condition.innerHTML = weatherData['weather'][0]['description'];
            var iconCode = weatherData['weather'][0]['icon'];
            self.weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
        });
}

// Use Enter to key to submit
var submit = document.getElementById('submitButton');
submit.addEventListener('click', findWeather);
document.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        findWeather();
    }
})
