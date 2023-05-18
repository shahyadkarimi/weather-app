class UI {
  // show weather info in html
  async showResult(info) {
    if (info) {
      await info.data.forEach((weather) => {
        cityName.textContent = `${weather.city_name},${weather.country_code}`;
        temperature.textContent = weather.temp;
        uvIndex.textContent = weather.uv.toFixed(0);
        windStatus.textContent = weather.wind_spd.toFixed(2);
        sunrise.textContent = `${weather.sunrise} AM`;
        sunset.textContent = `${weather.sunset} PM`;
        visibility.textContent = weather.vis.toFixed(1);
        airQuality.textContent = weather.aqi.toFixed(0);
        humidity.textContent = weather.rh.toFixed(0);

        this.uvIndexProgress(weather.uv.toFixed(0));
        this.humidityProgress(weather.rh.toFixed(0));
        this.airProgress(weather.aqi.toFixed(0));
      });

      ui.removeLoading();
    }
  }

  // show date & clock
  date() {
    let date = new Date();
    const day = document.querySelector(".day");
    const hours = document.querySelector(".hours");
    const minutes = document.querySelector(".minutes");
    let week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    day.innerHTML = `${week[date.getDay()]}`;
    hours.innerHTML =
      date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    minutes.innerHTML =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  }

  // show error msgs
  errorMsg(msg) {
    const errorMsg = document.querySelector(".error-msg");
    errorMsg.textContent = msg;
    errorMsg.classList.add("active");

    setTimeout(() => {
      errorMsg.classList.remove("active");
    }, 3000);
  }

  // show skeleton loading
  loading() {
    const loading = document.querySelectorAll(".loading");
    const absoluteLoading = document.querySelectorAll(".loading-absolute");

    loading.forEach((items) => {
      items.classList.add("skeleton");
    });

    absoluteLoading.forEach((items) => {
      items.classList.add("skeleton-absolute");
    });
  }

  // remove skeleton loading
  removeLoading() {
    const skeleton = document.querySelectorAll(".skeleton");
    const absoluteSkeleton = document.querySelectorAll(".skeleton-absolute");

    skeleton.forEach((items) => {
      items.classList.remove("skeleton");
    });

    absoluteSkeleton.forEach((items) => {
      items.classList.remove("skeleton-absolute");
    });
  }

  // calculate uvindex progressbar
  uvIndexProgress(uvIndex) {
    const progress = document.querySelector(".gauge-fill");
    progress.style.transform = `rotate(${uvIndex * 12}deg)`;
  }

  // humidity progressbar
  humidityProgress(humiditydata) {
    const humidity = document.querySelector(".humidity-progress");
    const humidityNumber = Number(humiditydata);

    humidity.style.height = `${humidityNumber}%`;
  }

  // air quality progressbar
  airProgress(quality) {
    const airQuality = document.querySelector(".air-quality-progress")
    const airQualityNum = Number(quality)

    airQuality.style.height = `${airQualityNum / 5}%`
  }

  // online or Offline internet conncetion notification & they'r styles
  connectionNotif(border, icon, title, desc) {
    const notification = document.querySelector(".notification-wrapper");
    const notifBorder = document.querySelector(".toast-not");
    const notifIcon = document.querySelector(".not-icon");
    const notifTitle = document.querySelector(".not-desc h2");
    const notifDesc = document.querySelector(".not-desc p");
    const closeBtn = document.querySelector(".not-close")

    if (notifBorder.classList.contains("border-red-400")) {
      notifBorder.classList.remove("border-red-400");
      notifBorder.classList.add(border);
    } else if (notifBorder.classList.contains("border-green-400")) {
      notifBorder.classList.remove("border-green-400");
      notifBorder.classList.add(border);
    } else {
      notifBorder.classList.add(border);
    }

    if (notifIcon.classList.contains("bg-red-400")) {
      notifIcon.classList.remove("bg-red-400");
      notifIcon.classList.add(icon);
    } else if (notifIcon.classList.contains("bg-green-400")) {
      notifIcon.classList.remove("bg-green-400");
      notifIcon.classList.add(icon);
    } else {
      notifIcon.classList.add(icon);
    }

    notifTitle.textContent = title;
    notifDesc.textContent = desc;
    if (notification.classList.contains("hide")) {
      notification.classList.remove("hide");
      notification.classList.add("show");
    } else {
      notification.classList.add("show");
    }

    closeBtn.addEventListener("click",e=>{
      notification.classList.add("hide")
    })
    setTimeout(() => {
      if (notification.classList.contains("show")) {
        notification.classList.remove("show");
        notification.classList.add("hide");
      }
    }, 3500);
  }
}
