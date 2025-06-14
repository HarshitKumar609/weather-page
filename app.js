
const key = "97bc1cd349544a86bfc85842252505";
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-icon");

async function weather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        document.querySelector(".cityname").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humid").innerHTML ="Humidity = "+ data.current.humidity + "%";
        document.querySelector(".wind-speed").innerHTML = "wind-speed ="+data.current.wind_kph + " km/h";

        const condition = data.current.condition.text.toLowerCase();

        if (condition.includes("cloud")) {
            weatherImg.src = "./images/clouds.png";
        } else if (condition.includes("mist")) {
            weatherImg.src = "./images/mist.png";
        } else if (condition.includes("clear")) {
            weatherImg.src = "./images/clear.png";
        } else if (condition.includes("drizzle")) {
            weatherImg.src = "./images/drizzle.png";
        } else if (condition.includes("rain")) {
            weatherImg.src = "./images/rain.png";
        } else if (condition.includes("snow")) {
            weatherImg.src = "./images/snow.png";
        } else {
            weatherImg.src = "./images/default.png"; // fallback icon
        }
        document.querySelector(".weather").style.display="block";

    } catch (error) {
        console.log("Error fetching weather:", error);
        alert("Could not find weather for this city.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city !== "") {
        weather(city);
    }
});
