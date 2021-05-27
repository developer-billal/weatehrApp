function getLocation(){
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log("Location is not supported by the browser!")
    }
}

function showPosition(position){
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    getWeather(lon, lat);
}
getLocation()

//Get weather from Api Provider
let key = '71ddd05001a07aa8698d41234c63f10d';
 function getWeather(longitude, latitude){
     let Api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=71ddd05001a07aa8698d41234c63f10d`;
    // if (location.protocol === 'http:') {
    //     url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=71ddd05001a07aa8698d41234c63f10d`;
    //  } else {
    //     url = `https:http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=71ddd05001a07aa8698d41234c63f10d`;
    //  }
     fetch(Api)
     .then(res =>{
         return res.json();
     })
     .then(data =>{
         city.innerHTML = data.name;
         condition.innerHTML = data.weather[0].description;
         degree.innerHTML = Math.floor(data.main.temp - 273.15) + ' °C';
         let iconcode = data.weather[0].icon;
         iconImg.src = "http://openweathermap.org/img/w/" + iconcode + ".png";
         humidity.innerHTML = "Humidity : " + data.main.humidity + "%";
         airPressure.innerHTML = "Air Pressure : " + data.main.pressure + " hPa";
         wiredSpeed.innerHTML = "Wind Speed : " + data.wind.speed + " km/h";
     })
     .catch(err =>{
         console.log(err);
     })
 }

 //Get Data from API using custom city
 button.addEventListener('click', function(){
     $("#exampleModal").modal('show');
 })

 //Add Event listener to save change button
 saveChange.addEventListener('click', function(){
     let newCity = document.querySelector('.myCity').value;
     let API = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${key}`;
     //Check the city same or not
     if(newCity){
        fetch(API)
        .then(res =>{
            return res.json();
        })
        .then(data =>{
           city.innerHTML = data.name;
           condition.innerHTML = data.weather[0].description;
           degree.innerHTML = Math.floor(data.main.temp - 273.15) + ' °C';
           let iconcode = data.weather[0].icon;
           iconImg.src = "http://openweathermap.org/img/w/" + iconcode + ".png";
           humidity.innerHTML = "Humidity : " + data.main.humidity + "%";
           airPressure.innerHTML = "Air Pressure : " + data.main.pressure + " hPa";
           wiredSpeed.innerHTML = "Wind Speed : " + data.wind.speed + " km/h";
        })
        .catch(err =>{
           console.log(err)
       })
       $('#exampleModal').modal('hide');
       errMsg.innerHTML = "";
       document.querySelector('.myCity').value = '';
    }else{
        errMsg.innerHTML = "You must fill in the field";
    }
 })


