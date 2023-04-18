
//set variables for the api keys to be used
var weatherApiKey = "344b6ee99ce4044f76f571e567f48b0c";




//set variables for the elements within the html
var searchBar = $('#search-bar');
var searchBarForm = $('#form1');
var inputForm = $('#city-input');
var todayForecastCard = $('#forecasttoday');
var todayForecastImg = $('#forecasttodayimg');
var todayForecastH5 = $('#forecasttodayh5');
var todayForecastPtag1 = $('#forecasttodayptag1');
var todayForecastPtag2 = $('#forecasttodayptag2');
var todayForecastPtag3 = $('#forecasttodayptag3');
var todayForecastPtag4 = $('#forecasttodayptag4');
var userInput;


var nowDayJS = dayjs().format('MM-DD-YYYY');

//pull from localstorage and convert to create stored city array
var storedArray = localStorage.getItem("city");
//stored in lower case to avoid inputting multiple dupes based on case
var localStorageArray = storedArray.toLowerCase().split(',');



//found this code at https://www.geeksforgeeks.org/how-to-remove-duplicate-elements-from-javascript-array/ to remove the duplicate values

function checkDups(array) {
    return array.filter((item,
        index) => array.indexOf(item) === index);
}

var filteredCityArray = checkDups(localStorageArray);


//for styling, wanted capital letters so grabbed this code from answer to https://stackoverflow.com/questions/63292341/make-first-letter-of-array-statement-uppercase-in-js

const arrayFirstLetterToCapital = () => { 
    return filteredCityArray.map(function(x){ 
         return x.split(" ").map(function(y){
              return y.charAt(0).toUpperCase()+y.slice(1);
         }).join(" ");
    });
}


//function to check for the ready state of the page and fill in from local storage the saved city values
$(document).ready(function() {
    createPForCities();
})

//function to create the 'p' tags from storage
function createPForCities() {

    
    for(var i = 0; i<filteredCityArray.length && i < 10; i++) {
    var createCity = document.createElement('p');
    createCity.setAttribute('style', 'display: block; background-color: gray; color: black');
    createCity.setAttribute('class', 'text-center citynames rounded m-1 w-100');
    createCity.textContent=arrayFirstLetterToCapital()[i];
    searchBar.append(createCity);
        
    }

}


function formSubmitHandler(event) {

    event.preventDefault();

    //grab value from city-input w/o empty spaces
    var userInput = inputForm.val().trim();    
 

        localStorageArray.push(userInput);
        localStorage.setItem("city", localStorageArray);
        var addUserInput = document.createElement('p');
        addUserInput.setAttribute('style', 'display: block; background-color: gray; color: black')
        addUserInput.setAttribute('class', 'text-center citynames rounded m-1 w-100');
        addUserInput.textContent=userInput;
        searchBar.append(addUserInput);
        
        
        var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid="+weatherApiKey+"&units=imperial"

        fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            todayForecastH5.text(userInput + " " + nowDayJS + " " + data.weather.icon);
            todayForecastPtag1.text("Current temp: " + data.main.temp + String.fromCharCode(176));
            todayForecastPtag2.text("Feels like: " + data.main.feels_like +String.fromCharCode(176));
            todayForecastPtag3.text("Humidity: " + data.main.humidity + String.fromCharCode(176));
            todayForecastPtag4.text("Wind: " + data.wind.speed + "mph");
            todayForecastPtag1.attr('style', 'font-size: 20px; color: #6c6c93');
            todayForecastPtag2.attr('style', 'font-size: 20px; color: #6c6c93');
            todayForecastPtag3.attr('style', 'font-size: 20px; color: #6c6c93');
            todayForecastPtag4.attr('style', 'font-size: 20px; color: #6c6c93');

        });

            
            var requestUrl5day = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid="+weatherApiKey
            fetch(requestUrl5day)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {


            });
       
        
      
       
  

    }
  




searchBarForm.on('submit', formSubmitHandler)