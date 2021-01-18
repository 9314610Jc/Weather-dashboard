var weather = [];





$('#submitBtn').click(function(event){
    event.preventDefault();
    var cityString = $('#citysearch').val();
    var city = cityString.split(',');
    
    // localStorage.setItem('city', city)
    // console.log(city); 

    $.ajax({
        //Current weather Data api
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city[0] + ',' + city[1] + ',US&appid=a05dd46eb02a5b52d207449c4ec0ce0b&units=imperial',
        type : 'GET',
    }).then(function(coordResponse){
        console.log(coordResponse)
         var cityName = coordResponse.name
         var citytemp = coordResponse.main.temp
         var cityHumidity = coordResponse.main.humidity
         var cityWindspeed = coordResponse.wind.speed
         var location = {name:cityName, temp: citytemp, humidity: cityHumidity, windspeed: cityWindspeed, stats: [citytemp, cityHumidity, cityWindspeed], statNames : ['', 'Temperature:', 'Humidity:', 'Windspeed:', 'UV Index:'] }
         weather.push(location)
       
        var lat = coordResponse.coord.lat;
        var lon = coordResponse.coord.lon;
    $.ajax({
        //UV Index Api
        url : 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=a05dd46eb02a5b52d207449c4ec0ce0b',
        type : 'GET'
    
    }).then(function(uvi){
        console.log(uvi);
        var cityUvi = uvi.value;
        location.uvi = cityUvi;
        location.stats.push(cityUvi);
        console.log(location)
        $.ajax({

            url : 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=a05dd46eb02a5b52d207449c4ec0ce0b&units=imperial&exclude=minutely,current,hourly,alerts',

            type : 'GET',
        }).then(function(response2){
            console.log(response2)
            var fivedayTempArr = [];
            var fivedayHumidArr = [];
            for(var z = 0; z < 5; z++){
               var fiveDayTemp = response2.daily[z].temp.day;
               var fivedayHumid = response2.daily[z].humidity;
               var fivedayIcon = response2.daily[z].weather[0].icon

               fivedayTempArr.push(fiveDayTemp)
               fivedayHumidArr.push(fivedayHumid)
             
            }
            var fivedayForecast = {temp: fivedayTempArr, humidity: fivedayHumidArr, icon: fivedayIcon}
            weather.push(fivedayForecast)
            console.log(weather)
            console.log(fivedayHumidArr);


                var newH5 = $('<h5>').addClass('card-title')
                newH5.text(weather[0].name)

                $('#mainCard').append(newH5)

                for(var j = 0; j < 4; j++){
                    var newP = $('<p>').addClass('card-text')

                    newP.text(weather[0].statNames[j+1] + weather[0].stats[j]);
                    $('#mainCard').append(newP);
                }
                
        
                for(var i =0; i < 5; i++){
                  
                    var newCard = $('<div>').addClass('card')
                    $('#5days').append(newCard);
                    var newCardBody = $('<div>').addClass('card-body');
                    newCard.append(newCardBody);
                    
                    var newH6 = $('<h5>').addClass('card-title')
                    newH6.text('date')
                    newCardBody.append(newH6)
                    
                        var newP = $('<p>').addClass('card-text')
                        newP.text(weather[1].temp[i] + 'F')
                        newCardBody.append(newP);

                        

                        var newP2 = $('<p>').addClass('card-text')
                        newP2.text(weather[1].humidity[i]+ '%')
                        newCardBody.append(newP2)
                        
                    
                   
                   

                    

                }
                
                console.log(weather[1])
                
                
                

                    
    
                


            
        });
        
        
    })
})
    
   
    
})







 

    // $.ajax({
    //     URL :'https://api.openweathermap.org/data/2.5/weather?q=London&appid=a05dd46eb02a5b52d207449c4ec0ce0b',
    //     type : 'GET',
    //     dataType: 'json',
    // }).then()
       // URL: 'api.openweathermap.org/data/2.5/weather?q='+ cityName + ',' + stateCode + '&appid=a05dd46eb02a5b52d207449c4ec0ce0b&units=imperial',
          
