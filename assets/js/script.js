//to do seperate functions to create better DRY code

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
var todayIcon = $('#iconToday');
var userInput;
var localStorageArray;

//variable for the date

var nowDayJS = dayjs().format('MM-DD-YYYY');

//pull from localstorage to set up the searched cities list
if ((localStorage.getItem("city"))===null) {
    localStorageArray=[]; 
} else {
    localStorageArray=(localStorage.getItem("city")).split(',');   
};



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
    displayLastSearch();
       
    });

//function to create the 'p' tags from storage, capped list at 10 saved searches
function createPForCities() {
    
    for(var i = 0; i<filteredCityArray.length && i < 10; i++) {
    var createCity = document.createElement('p');
    createCity.setAttribute('style', 'display: block; background-color: gray; color: black');
    createCity.setAttribute('class', 'border border-dark text-center citynames rounded m-1 w-100');
    createCity.textContent=arrayFirstLetterToCapital()[i];
    searchBar.append(createCity);
        
    };

};

//function to load last search upon restarting page
function displayLastSearch() {
    const lastSearch = localStorage.getItem("city");
    const lastSearchArray = lastSearch.split(',');
    const lastUserInput = lastSearchArray.slice(-1);

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + lastUserInput + "&appid="+weatherApiKey+"&units=imperial"

    fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            
            todayForecastH5.text(lastUserInput + " " + nowDayJS);
         
            var iconURL = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png'
            
            todayIcon.attr('src', iconURL);
            todayForecastPtag1.text("Current temp: " + data.main.temp + String.fromCharCode(176));
            todayForecastPtag2.text("Feels like: " + data.main.feels_like +String.fromCharCode(176));
            todayForecastPtag3.text("Humidity: " + data.main.humidity + String.fromCharCode(176));
            todayForecastPtag4.text("Wind: " + data.wind.speed + "mph");
            todayForecastPtag1.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag2.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag3.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag4.attr('style', 'font-size: 20px; font-weight: bold; color: black');
    
        });
        var requestUrl5day = "https://api.openweathermap.org/data/2.5/forecast?q="+lastUserInput+"&appid="+weatherApiKey+"&units=imperial"
            //fetch for 5 day url and associated actions to populate fields
            fetch(requestUrl5day)
            .then(function (response2) {
            return response2.json();
            })
            .then(function (data2) {
                
                for (var i = 1; i<6; i++) {
                var fiveDayH5 = "#fiveday" + i + "h5";
                var fiveDayPTag1Concat = "#fiveday" + i + "ptag1";
                var fiveDayPTag2Concat = "#fiveday" + i + "ptag2";
                var fiveDayPTag3Concat = "#fiveday" + i + "ptag3";
                var fiveDayPTag4Concat = "#fiveday" + i + "ptag4";
                var fiveDayIconUrl = 'https://openweathermap.org/img/wn/'+data2.list[i].weather[0].icon+'@2x.png'
    
                var fiveDayHeader=$(fiveDayH5);
                var fiveDayIconId = "#iconfiveday"+i;
                var targetFiveDayIcon = $(fiveDayIconId);
                targetFiveDayIcon.attr('src', fiveDayIconUrl);
                
                var fiveDayPTag1=document.querySelector(fiveDayPTag1Concat);
                var fiveDayPTag2=document.querySelector(fiveDayPTag2Concat);
                var fiveDayPTag3=document.querySelector(fiveDayPTag3Concat);
                var fiveDayPTag4=document.querySelector(fiveDayPTag4Concat);
                var computedDate = dayjs().add(i, 'day').format('MM-DD');
                fiveDayHeader.text(computedDate);
                fiveDayPTag1.textContent="Current temp: " + data2.list[i].main.temp + String.fromCharCode(176);
                fiveDayPTag2.textContent="Feels like: " + data2.list[i].main.feels_like +String.fromCharCode(176);
                fiveDayPTag3.textContent="Humidity: " + data2.list[i].main.humidity + String.fromCharCode(176);
                fiveDayPTag4.textContent="Wind: " + data2.list[i].wind.speed + "mph";
                fiveDayPTag1.setAttribute('style', 'font-size: 16px; font-weight: bold;color: black');
                fiveDayPTag2.setAttribute('style', 'font-size: 16px; font-weight: bold;color: black');
                fiveDayPTag3.setAttribute('style', 'font-size: 16px; font-weight: bold;color: black');
                fiveDayPTag4.setAttribute('style', 'font-size: 16px; font-weight: bold;color: black');
    
                }
            }); 

    
}
 

function formSubmitHandler(event) {

    event.preventDefault();

    //grab value from city-input w/o empty spaces
    var userInput = inputForm.val().trim();    
    
    //push userInput to localStorage
        localStorageArray.push(userInput);
        localStorage.setItem("city", localStorageArray);
        //add input to the citynames list for searching later
        var addUserInput = document.createElement('p');
        addUserInput.setAttribute('style', 'display: block; background-color: gray; color: black')
        addUserInput.setAttribute('class', 'text-center citynames rounded m-1 w-100');
        addUserInput.textContent=userInput;
        searchBar.append(addUserInput);
        
        var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid="+weatherApiKey+"&units=imperial"

        //fetch pull and associated actions for pulling the current day weather and filling in the card for that weather.
        fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            //pull data from the current day api and fill boxes based on the returned value
            todayForecastH5.text(userInput + " " + nowDayJS);
         
            var iconURL = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png'
            console.log(iconURL);
            todayIcon.attr('src', iconURL);
            todayForecastPtag1.text("Current temp: " + data.main.temp + String.fromCharCode(176));
            todayForecastPtag2.text("Feels like: " + data.main.feels_like +String.fromCharCode(176));
            todayForecastPtag3.text("Humidity: " + data.main.humidity + String.fromCharCode(176));
            todayForecastPtag4.text("Wind: " + data.wind.speed + "mph");
            todayForecastPtag1.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag2.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag3.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag4.attr('style', 'font-size: 20px; font-weight: bold; color: black');
    
        });
    
            //setting up url for 5 day API pull
            var requestUrl5day = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid="+weatherApiKey+"&units=imperial"
            //fetch for 5 day url and associated actions to populate fields
            fetch(requestUrl5day)
            .then(function (response2) {
            return response2.json();
            })
            .then(function (data2) {
                console.log(data2);
                for (var i = 1; i<6; i++) {
                var fiveDayH5 = "#fiveday" + i + "h5";
                var fiveDayPTag1Concat = "#fiveday" + i + "ptag1";
                var fiveDayPTag2Concat = "#fiveday" + i + "ptag2";
                var fiveDayPTag3Concat = "#fiveday" + i + "ptag3";
                var fiveDayPTag4Concat = "#fiveday" + i + "ptag4";
                var fiveDayIconUrl = 'https://openweathermap.org/img/wn/'+data2.list[i].weather[0].icon+'@2x.png'
    
                var fiveDayHeader=$(fiveDayH5);
                var fiveDayIconId = "#iconfiveday"+i;
                var targetFiveDayIcon = $(fiveDayIconId);
                targetFiveDayIcon.attr('src', fiveDayIconUrl);
                
                var fiveDayPTag1=document.querySelector(fiveDayPTag1Concat);
                var fiveDayPTag2=document.querySelector(fiveDayPTag2Concat);
                var fiveDayPTag3=document.querySelector(fiveDayPTag3Concat);
                var fiveDayPTag4=document.querySelector(fiveDayPTag4Concat);
                var computedDate = dayjs().add(i, 'day').format('MM-DD');
                fiveDayHeader.text(computedDate);
                fiveDayPTag1.textContent="Current temp: " + data2.list[i].main.temp + String.fromCharCode(176);
                fiveDayPTag2.textContent="Feels like: " + data2.list[i].main.feels_like +String.fromCharCode(176);
                fiveDayPTag3.textContent="Humidity: " + data2.list[i].main.humidity + String.fromCharCode(176);
                fiveDayPTag4.textContent="Wind: " + data2.list[i].wind.speed + "mph";
                fiveDayPTag1.setAttribute('style', 'font-size: 16px; font-weight: bold;color: black');
                fiveDayPTag2.setAttribute('style', 'font-size: 16px; font-weight: bold;color: black');
                fiveDayPTag3.setAttribute('style', 'font-size: 16px; font-weight: bold;color: black');
                fiveDayPTag4.setAttribute('style', 'font-size: 16px; font-weight: bold;color: black');
    
                }
            }); 
    }
//event handler for the form submit      
searchBarForm.on('submit', formSubmitHandler);
//event handler for clicking a city name from the search list
searchBar.on('click', '.citynames', function (event) {

    userInput = event.target.textContent;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid="+weatherApiKey+"&units=imperial"
    fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            todayForecastH5.text(userInput + " " + nowDayJS);
            console.log(data);
            console.log(data.weather[0].icon);
            var iconURL = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png'
            console.log(iconURL);
            todayIcon.attr('src', iconURL);
            todayForecastPtag1.text("Current temp: " + data.main.temp + String.fromCharCode(176));
            todayForecastPtag2.text("Feels like: " + data.main.feels_like +String.fromCharCode(176));
            todayForecastPtag3.text("Humidity: " + data.main.humidity + String.fromCharCode(176));
            todayForecastPtag4.text("Wind: " + data.wind.speed + "mph");
            todayForecastPtag1.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag2.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag3.attr('style', 'font-size: 20px; font-weight: bold; color: black');
            todayForecastPtag4.attr('style', 'font-size: 20px; font-weight: bold; color: black');
    
        });
    
            //setting up url for 5 day API pull
            var requestUrl5day = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid="+weatherApiKey+"&units=imperial"
            //fetch for 5 day url and associated actions to populate fields
            fetch(requestUrl5day)
            .then(function (response2) {
            return response2.json();
            })
            .then(function (data2) {
                console.log(data2);
                for (var i = 1; i<6; i++) {
                var fiveDayH5 = "#fiveday" + i + "h5";
                var fiveDayPTag1Concat = "#fiveday" + i + "ptag1";
                var fiveDayPTag2Concat = "#fiveday" + i + "ptag2";
                var fiveDayPTag3Concat = "#fiveday" + i + "ptag3";
                var fiveDayPTag4Concat = "#fiveday" + i + "ptag4";
                var fiveDayIconUrl = 'https://openweathermap.org/img/wn/'+data2.list[i].weather[0].icon+'@2x.png'
    
                var fiveDayHeader=$(fiveDayH5);
                var fiveDayIconId = "#iconfiveday"+i;
                var targetFiveDayIcon = $(fiveDayIconId);
                targetFiveDayIcon.attr('src', fiveDayIconUrl);
                
                var fiveDayPTag1=document.querySelector(fiveDayPTag1Concat);
                var fiveDayPTag2=document.querySelector(fiveDayPTag2Concat);
                var fiveDayPTag3=document.querySelector(fiveDayPTag3Concat);
                var fiveDayPTag4=document.querySelector(fiveDayPTag4Concat);
                var computedDate = dayjs().add(i, 'day').format('MM-DD');
                fiveDayHeader.text(computedDate);
                fiveDayPTag1.textContent="Current temp: " + data2.list[i].main.temp + String.fromCharCode(176);
                fiveDayPTag2.textContent="Feels like: " + data2.list[i].main.feels_like +String.fromCharCode(176);
                fiveDayPTag3.textContent="Humidity: " + data2.list[i].main.humidity + String.fromCharCode(176);
                fiveDayPTag4.textContent="Wind: " + data2.list[i].wind.speed + "mph";
                fiveDayPTag1.setAttribute('style', 'font-size: 12px; font-weight: bold;color: black');
                fiveDayPTag2.setAttribute('style', 'font-size: 12px; font-weight: bold;color: black');
                fiveDayPTag3.setAttribute('style', 'font-size: 12px; font-weight: bold;color: black');
                fiveDayPTag4.setAttribute('style', 'font-size: 12px; font-weight: bold;color: black');
                };

    });
});