const apikey = "e9556191ebd6a121d5fa668f6a17c5cd";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function updateDateTime() {
  const now = new Date();

  document.querySelector(".day").innerHTML = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata"
  });

  document.querySelector(".time").innerHTML = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  });
}

setInterval(updateDateTime, 1000);
updateDateTime();

async function checkWeather(city) {
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error("City not found!");
    }
    
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "sunny.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "storm.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "snow.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "weather.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "foggy-day.png";
    }
    
    // Show the weather info (in case it was hidden)
    document.querySelector(".weather").style.display = "block";
    
  } catch (error) {
    alert(error.message);
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  checkWeather(city);
});

// Optional: Allow pressing Enter key to search
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    checkWeather(city);
  }
});

// Optional: Load weather for a default city on page load
// checkWeather("Delhi");