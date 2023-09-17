const apiKey = "b36dd40ecdcc8d6a78a3dd7589f49794";

const showError = (msg) => (document.querySelector(".msg").innerText = msg);
const clearErrors = () => (document.querySelector(".msg").innerHTML = "");
const clearInput = () => (document.querySelector("form input").value = "");

const showWeatherData = (data) => {
  const {
    name,
    sys: { country },
    weather,
    main,
    wind
  } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  const div = document.createElement("div");
  div.classList.add("city");
  div.innerHTML = `
        <div class="cityName">${name}, ${country}</div>
        <div class="temp">
            <div class="currentTemp">
                ${Math.round(main.temp)}<sup>°C</sup>
            </div>
            <div class="minMax">
                <div><img src="./assets/images/upArrow.png">${Math.round(
                  main.temp_max
                )}<sup>°C</sup></div>
                <div><img src="./assets/images/downArrow.png">${Math.round(
                  main.temp_min
                )}<sup>°C</sup></div>
            </div>
        </div>
        <div class="weatherIcon">
            <img src="${icon}" />
        </div>
        <div class="weatherDescription">${weather[0].description}</div>
        <div class="weatherDetails">
            <div class="weatherDetail">
                <div>${Math.round(main.feels_like)}<sup>°C</sup></div>
                <span>feels like</span>
            </div>
            <div class="weatherDetail">
                <div>${wind.speed}mph</div>
                <span>wind</span>
            </div>
            <div class="weatherDetail">
                <div>${main.humidity}%</div>
                <span>humidity</span>
            </div>
        </div>
    `;

  document.querySelector(".cities").appendChild(div);
};

const getCityData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
    );
    const data = await response.json();
    showWeatherData(data);
  } catch (err) {
    showError("Please search for a valid city");
  }
};

const checkInput = (inputValue) => {
  clearInput();
  clearErrors();

  const cities = [];
  document.querySelectorAll(".cityName").forEach((city) => {
    cities.push(city.textContent.split(",")[0].trim().toLowerCase());
  });

  if (cities.includes(inputValue))
    showError("You already know the weather for this city");
  else getCityData(inputValue);
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = document.querySelector("form input").value;

  if (inputValue !== "") {
    checkInput(inputValue.trim().toLowerCase());
  }
});
