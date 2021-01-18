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
        
    }) 
    })
    
    $.ajax({
        //5 day 3 hour forecast api
        url: 'https://api.openweathermap.org/data/2.5/forecast?q='+ city[0] + ',' + city[1] + ',US&appid=a05dd46eb02a5b52d207449c4ec0ce0b',
        type : 'GET',
    }).then(function(response2){
        console.log(weather[0].name)
        var newH5 = $('<h5>').addClass('card-title')
        newH5.text(weather[0].name)
        $('#mainCard').append(newH5)
        console.log(location)
        for(var i = 0; i < 4; i++){
            var newP = $('<p>').addClass('card-text')
            console.log(weather[0].statNames)
            console.log(weather[0].stats)
            newP.text(weather[0].statNames[i+1] + weather[0].stats[i]);
            $('#mainCard').append(newP);
        }
        


        // $('#currentCardCity').text(weather[0].name)
        // $('#currentCardHumidity').text(weather[0].humidity)
        // $('#currentCardUvi').text
        
    
    });
    
    

})







 

    // $.ajax({
    //     URL :'https://api.openweathermap.org/data/2.5/weather?q=London&appid=a05dd46eb02a5b52d207449c4ec0ce0b',
    //     type : 'GET',
    //     dataType: 'json',
    // }).then()
       // URL: 'api.openweathermap.org/data/2.5/weather?q='+ cityName + ',' + stateCode + '&appid=a05dd46eb02a5b52d207449c4ec0ce0b&units=imperial',
          
