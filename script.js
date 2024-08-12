const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector(".search-input");
const weatherElement = document.querySelector(".weather-container");
const errorElement = document.querySelector(".error");

searchBtn.addEventListener("click", async function(){
    const locationVal = searchInput.value;
    if(locationVal){
       const data = await fetchWeather(locationVal);

       if(data){
          updateDOM(data);
          errorElement.style.display="none";
          weatherElement.style.display="block";
       }else{
          errorElement.style.display="block";
          weatherElement.style.display="none";
       }
       searchInput.value = "";
    }
});

async function fetchWeather(location){
    const url = `https://api.weatherapi.com/v1/current.json?key=1a0f4fc8e5a74f09b7e21652241008&q=${location}&aqi=no`;

    const response = await fetch(url);
    if(response.status == 400){
        return null;
    }
    else{
        const jsonData = await response.json();
        return jsonData;
    }
}

const temperatureElem = document.querySelector(".temperature");
const locationElem = document.querySelector(".location");
const emojiImg = document.querySelector(".emoji");
const conditionElem = document.querySelector(".condition");
const humidityElem = document.querySelector(".humidity-val");
const windSpeedElem = document.querySelector(".wind-speed-val");

function updateDOM(data){
    /***********************filter required data*********************/
    const temp = data.current.temp_c;
    const location = data.location.name;
    const iconLink = data.current.condition.icon;
    const condition = data.current.condition.text;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    /*********************update the dom*************************/
    temperatureElem.textContent = temp + "°C";
    locationElem.textContent = location;
    emojiImg.src = iconLink;
    conditionElem.innerText = condition;
    humidityElem.innerText = humidity + "%";
    windSpeedElem.innerText = windSpeed + " kph";
}