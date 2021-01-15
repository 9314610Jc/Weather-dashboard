$(document).ready(function(){
    var cityName = 0
    var stateCode = 0
    $.ajax({
       // URL: 'api.openweathermap.org/data/2.5/weather?q='+ cityName + ',' + stateCode + '&appid=a05dd46eb02a5b52d207449c4ec0ce0b&units=imperial',
        URL :'api.openweathermap.org/data/2.5/weather?q=London&appid=a05dd46eb02a5b52d207449c4ec0ce0b',
        method : 'GET'
    }).then(function(response){
        console.log(response);
    })
})