
const weather=document.querySelector(".js-weather");
const API_KEY="52e95c3e76659be8f24c56f62742b7e7";
const COORDS='coords';

function getWeather(lat,lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
      return response.json();
  }).then(function(json){
      const temperature=json.main.temp;
      const place=json.name;
      weather.innerText=`${temperature}°C ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));

}

function handleGeoSucces(position){
  const latitude=position.coords.latitude;
  const longitude=position.coords.longitude;
  const coordsObj={
    latitude:latitude,
    longitude:longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}
function handleGeoError(){
  console.log("Cant access geo location");
}
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords==null){
      askForCoords();
    }
    else{
        const parsedCoords=JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
  loadCoords();
}
init();
