  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    if (weather.cod == '404'){
      const error = document.querySelector(".error");
      error.textContent = "Sorry, Please Enter Another Value"
    }
    else{
      let city = document.querySelector('.location .city');
      city.innerText = `${weather.name}, ${weather.sys.country}`;
    
      let now = new Date();
      let date = document.querySelector('.location .date');
      date.innerText = dateBuilder(now);
    
      let temp = document.querySelector('.current .temp');
      temp.innerHTML = `${Math.round((weather.main.temp)-272.15)}<span>°c</span>`;
    
      let weather_el = document.querySelector('.current .weather');
      weather_el.innerText = weather.weather[0].main;
    
      let hilow = document.querySelector('.hi-low');
      hilow.innerText = `Sea Level: ${weather.main.sea_level} m`;
  
      let wind_sp = document.querySelector('.wind_sp');
      wind_sp.innerText = `Wind Speed: ${weather.wind.speed} kmph`;
  
      let pressure = document.querySelector('.pressure');
      pressure.innerText = `Wind Speed: ${weather.main.pressure} Pa`;

      let weatherIcon = document.querySelector('.weather-icon');
      let iconURL = "http://openweathermap.org/img/w/";
      weatherIcon.src = iconURL + weather.weather[0].icon + ".png";
    }
    
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }