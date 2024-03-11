async function fetchWeather() {
  // Step a. Create global variables and start inner functions
  let searchInput = document.getElementById('search').value;
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "block";

  const apiKey = "d5a8179e88dc5fcbe562c91efe0f28d4"


  if(searchInput == "") {
    weatherDataSection.innerHTML = `
    <div>
    <h2>Empty Input!</h2>
    <p>Please try again with a valid <u>city name</u>.</p>
    </div>
    `;
    return;
  }

  // Step b. Get lat and lon coordinates via Geocoding API
  async function getLonAndLat() {
    geocodeURL = `http://api.openweathermap.org/data/2.5/weather?q=${searchInput.replace(" ", "%20")}&appid=${apiKey}`

    const response = await fetch(geocodeURL);
    console.log(response)
    if(!response.ok) {
      console.log("Bad response! ", response.status);
      weatherDataSection.innerHTML = `
      <div>
      <h2>Invalid Input: "${searchInput}"</h2>
      <p>Please try again with a valid <u>city name</u>.</p>
      </div>
      `;
      return;
    }

    const data = await response.json();
    console.log(data)
    if(data.length == 0) {
      console.log("Something went wrong here.");
      weatherDataSection.innerHTML = `
      <div>
      <h2>Invalid Input: "${searchInput}"</h2>
      <p>Please try again with a valid <u>city name</u>.</p>
      </div>
      `;
      return;
    } else {
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
    <div>
      <h2>${data.name}</h2>
      <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `
  
    }
  }
  document.getElementById("search").value = "";
  await getLonAndLat();
}
