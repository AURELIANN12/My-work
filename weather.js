// Selecting the form element with the class "weatherForm"
 const weatherForm = document.querySelector(".weatherForm");
 // Selecting the input element with the class "cityInput"
const cityInput = document.querySelector(".cityInput");
// Selecting the element with the class "card"
const card = document.querySelector(".card");
// Storing the API key in a constant variable
const apiKey = "427c623022854b923bae611251a0d8ea";
// Adding an event listener to the form for when it is submitted
weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
 // Getting the value of the city input
    const city = cityInput.value;
// Checking if a city value is provided
    if(city){
        try{
            // Fetching weather data for the provided city
            const weatherData = await getWeatherData(city);
             // Displaying the weather information
            displayWeatherInfo(weatherData);
        }
         // Checking errors that may occur during fetching weather data
        catch(error){
            console.error(error);
           // Display error
            displayError(error);
        }
    }
    else{
      //  if city is not typed display mesage'enter a city'
        displayError("Please enter a city");
    }
});
// function to fetch data for a given city
async function getWeatherData(city){
 // Constructing the API URL with the provided city and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//fetch weather from the api
    const response = await fetch(apiUrl);
//if weather can not be fetched display eror'mesage'
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
//returning weather data in json format
    return await response.json();
}
//function to display weather data 
function displayWeatherInfo(data){
// destructuring weather data for easier acces and handling
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
//clearing the card content
    card.textContent = "";
    //display the card as a flex container
    card.style.display = "flex";
//variables for displaing weather informatiom
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
//setting the context for each element
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
//adding class for each element for styling
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
//appeanding information elements to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}
//function to determine the emoji based on weather
function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        
    }
}
//function to display error mesage
function displayError(message){
//creating a variable to store error mesage
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    //appending mesage to the card
    card.appendChild(errorDisplay);
}

