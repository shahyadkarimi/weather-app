// classes
const weather = new Weather();
const ui = new UI();

// variables
const searchForm = document.querySelector("#search-form");
let temperature = document.querySelector("#weather-temperature");
let uvIndex = document.querySelector("#UV-index");
let windStatus = document.querySelector("#wind-status");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let humidity = document.querySelector("#humidity");
let visibility = document.querySelector("#visibility");
let airQuality = document.querySelector("#air-quality");
let cityName = document.querySelector("#city-name");

ui.loading();

// ------ eventlisteners

// defualt city
document.addEventListener("DOMContentLoaded", (e) => {
  // when dom loaded if internet was offline show notif
  if(navigator.onLine == false){
  // offline notif
    ui.connectionNotif("border-red-400","bg-red-400","You're Offline","Oops! Internet is disconnected")
  }

  weather.weatherAPI("New York").then((res) => ui.showResult(res));
  setInterval(() => {
    ui.date();
  }, 1000);
});

// When the user is offline, the app is in preloading & showing offline notif
window.addEventListener("offline",e=>{
  // offline notif
  ui.connectionNotif("border-red-400","bg-red-400","You're Offline Now","Oops! Internet is disconnected")

  // skeleton loading
  ui.loading()
})

// submit the search form and send city name to API
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = searchForm.querySelector("#search").value;

  // get the city name
  if (search) {
    // loading
    ui.loading();

    // send city name to api
    weather.weatherAPI(search.replace(/\s/g, ''))

    // show api result in html
    .then((res) => {
      ui.showResult(res);
      console.log(res)
      })
  } else {
    ui.errorMsg("Please Enter Your City Name");
  }
});

// Load data when the user is back online & showing online notif 
window.addEventListener("online",e=>{
  // online notif
  ui.connectionNotif("border-green-400","bg-green-400","You're Online Now","Hurray! Internet is connected")

  const searchInput = document.querySelector("#search").value

  weather.weatherAPI(searchInput)

    // show api result in html
    .then((res) => {
      ui.showResult(res);
    })
})