
// Background Picture
async function getBg(cond){


    var response = await fetch(`https://api.pexels.com/v1/search?&query=${cond}&page=1&per_page=1`, {
        headers: {
            Authorization: 'ONjjXd9LdGIFSSfFWJCQYtvYNdTHqkweJYCGPvmufOx4dgEBHssTGyn0',
            // mode: 'cors'
          }
    })

    
    var data = await response.json()

    var data = data['photos'][0]['src']['original']

    var body =  await document.querySelector('body')

    body.style.backgroundImage = await `url(${data})`


}



// Get The Weather
async function getWeather(loc){
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=45cdabc747ea403da48231403231109&q=${loc}`,{mode:'cors'})
    await console.log(response)
    if (response['status']>=400){
        alert('Invalid Location')
    }
    else{
        var data = await response.json()
        await console.log(data)

        processData(data)
    }
   
}

async function processData(data){

    if (data['error'])
    
    {

    console.log('ERROR')

    }
    else{
    var weather_obj  = await {
        'city': data['location']['name'],
        'temp': data['current']['temp_f'],
        'humidity': data['current']['humidity'],
        'feels_likes': data['current']['feelslike_f'],
        'icon': data['current']['condition']['icon'],
        'text': data['current']['condition']['text'],
        'is_day': data['current']['is_day'],
        'code': data['current']['condition']['code']

    }
    await displayTemp(weather_obj)

}

    

}

async function displayTemp(w_obj){
    console.log(w_obj['icon'])

    // set bg

    if (w_obj['is_day']==1){
        cond = w_obj['text'] + ' day' + w_obj['city']
    }
    else{
        cond = w_obj['text']+' night' + w_obj['city']
    }

    await getBg(cond)


    //dislay everything
    var main_div = document.querySelector('.weather-main')

    if(main_div){

     var city = document.querySelector('.city')
     var text = document.querySelector('.condition')
     var temp = document.querySelector('.temp')
     var humidity = document.querySelector('.humidity')
     var feels_likes = document.querySelector('.feels-like')
     var icon = document.querySelector('.icon')
     var icon_img = document.querySelector('.icon-img')





    }
    else{

    var main_div = document.createElement('div')
    main_div.className = 'weather-main'

    var city =  document.createElement('div')
    city.className = 'content city'

    var text = document.createElement('div')
    text.className = 'content condition'


    var temp =  document.createElement('div')
    temp.className = 'content temp'

    var humidity =  document.createElement('div')
    humidity.className = 'content humidity'

    var feels_likes =  document.createElement('div')
    feels_likes.className = 'content feels-like'

    var icon =  document.createElement('div')
    icon.className = 'content icon'

    var icon_img = document.createElement('img')
    icon_img.className = 'content icon-img'


    }




    city.textContent = w_obj['city']

    temp.textContent = "Temperature: "+ w_obj['temp'] + '° F'

    humidity.textContent = "Humidity: "+ w_obj['humidity'] + '%'

    feels_likes.textContent = "Feels Like: "+ w_obj['feels_likes'] + '° F'

    text.textContent = w_obj['text']
    text.appendChild(icon)



    icon_img.src = `https://${w_obj['icon']}`

    icon.appendChild(icon_img)
    

    main_div.appendChild(city)
    main_div.appendChild(text)

    main_div.appendChild(temp)
    main_div.appendChild(humidity)
    main_div.appendChild(feels_likes)
    // main_div.appendChild(icon)

    body = document.querySelector('body')

    await body.appendChild(main_div)





    //if response code is not ok, i.e no info, create some sort of alert


}



search_bar = document.querySelector(".search")
// console.log(`Search Bar ${search_bar}`)
search_bar.addEventListener('keypress',
function(e){
    if (e.key=='Enter' & search_bar.value!=''){
        getWeather(search_bar.value)
    }
})
