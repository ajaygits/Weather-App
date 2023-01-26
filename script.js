const api={
    key:"01871ecc39b2734aca66a568d82dd000",
    base:"http://api.openweathermap.org/data/2.5/"
}

const search=document.querySelector(".search");
const button=document.querySelector(".btn");

button.addEventListener("click",function(e){
    e.preventDefault();
    if(e.type=="click"){
        getData(search.value);
        // console.log(search.value);
    }
})

function getData(){
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response =>{
        return response.json();
    }).then(displayData);
  
}

function displayData(response){
    // console.log(response);
    if(response.cod==="404" || search.value==""){
        const error=document.querySelector(".error");
        error.style.display="block";
        search.value="";

        setTimeout(function(){
        const end=document.querySelector(".end");
        error.style.display="none";
        search.value="";
        },2000)
    }else{
        const city=document.querySelector(".city");
        city.innerText=`${response.name},${response.sys.country}`;

        const temp=document.querySelector(".temp");
        temp.innerHTML=`Temperature:${Math.round(response.main.temp)}<span>°C</span>`

        const date=new Date().toDateString();
        const date1=document.querySelector(".date");
        date1.innerHTML=date;

        const weather=document.querySelector(".weather");
        weather.innerHTML=`Weather:${response.weather[0].main}`;

        const range=document.querySelector(".temp-range");
        range.innerHTML=`Temperature Range:${Math.round(response.main.temp_min)} °C / ${Math.round(response.main.temp_max)}°C`;

        const icon=document.querySelector(".weather-icon");
        const url="http://api.openweathermap.org/img/w/"
        icon.src=url + response.weather[0].icon + ".png";

        search.value="";
    }
}
