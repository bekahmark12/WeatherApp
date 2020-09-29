
let api = 'cf1f7d4c3c081c2a86a5d20ee960b171';
let city = 'Salt Lake City, UT';
let country = 'US';
const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=imperial&APPID=${api}`;
const day0 = document.getElementById('today');
const day1 = document.getElementById('tomorrow');
const day2 = document.getElementById('day3');
const day3 = document.getElementById('day4');
const day4 = document.getElementById('day5');

let day1Temp = 0
let day2Temp = 0
let day3Temp = 0
let day4Temp = 0
let day5Temp = 0

const celsiusButton = document.getElementById('celsiusButton');
const farenheitButton = document.getElementById('farenheitButton');

let days = [];
for (let i = 0; i < 5; i++) {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + i);
  days.push(tomorrow);
}

const desc0 = document.getElementById('description0');
const desc1 = document.getElementById('description1');
const desc2 = document.getElementById('description2');
const desc3 = document.getElementById('description3');
const desc4 = document.getElementById('description4');

const temp0 = document.getElementById('temp0');
const temp1 = document.getElementById('temp1');
const temp2 = document.getElementById('temp2');
const temp3 = document.getElementById('temp3');
const temp4 = document.getElementById('temp4');

const header0 = document.getElementById('boxHeader0');
const header1 = document.getElementById('boxHeader1');
const header2 = document.getElementById('boxHeader2');
const header3 = document.getElementById('boxHeader3');
const header4 = document.getElementById('boxHeader4');

function weatherDisplay(num, data) {
  switch (data.list[num].weather[0].main) {
    case 'Rain': return 'Images/RainDay.png';
    case 'Snow': return 'Images/Snow.png';
    case 'Cloudy': return 'Images/FewCloudsDay.png';
    case 'Thunderstorm': return 'Images/ThunderStorm.png';
    case 'Drizzle': return 'Images/RainShower.png';
    case 'Clear': return 'Images/ClearDay.png';
    case 'Clouds': return 'Images/FewCloudsDay.png';
  }
}
function weatherBackgroud(num, data) {
  switch (data.list[num].weather[0].main) {
    case 'Rain': return 'Images/rainyBG.png';
    case 'Snow': return 'Images/snowyBG.png';
    case 'Cloudy': return 'Images/cloudyBG.png';
    case 'Thunderstorm': return 'Images/rainyBG.png';
    case 'Drizzle': return 'Images/rainyBG.png';
    case 'Clear': return 'Images/sunnyBG.png';
    case 'Clouds': return 'Images/cloudyBG.png';
  }
}

function convertToCelsius(temp) {
  let celsius = ((temp - 32) * 5) / 9;
  return Math.round(celsius);
}

celsiusButton.addEventListener('click', function setCelsTemps() {
  let cels1 = convertToCelsius(day1Temp);
  let cels2 = convertToCelsius(day2Temp);
  let cels3 = convertToCelsius(day3Temp);
  let cels4 = convertToCelsius(day4Temp);
  let cels5 = convertToCelsius(day5Temp);

  temp0.innerHTML = cels1 + '&deg;C';
  temp1.innerHTML = cels2 + '&deg;C';
  temp2.innerHTML = cels3 + '&deg;C';
  temp3.innerHTML = cels4 + '&deg;C';
  temp4.innerHTML = cels5 + '&deg;C';
})

farenheitButton.addEventListener('click', function setFarenheitTemp() {
  temp0.innerHTML =  day1Temp + '&deg;F';
  temp1.innerHTML =  day2Temp + '&deg;F';
  temp2.innerHTML =  day3Temp + '&deg;F';
  temp3.innerHTML =  day4Temp + '&deg;F';
  temp4.innerHTML =  day5Temp + '&deg;F';
})

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    day1Temp = data.list[0].main.temp;
    day2Temp = data.list[8].main.temp;
    day3Temp = data.list[16].main.temp;
    day4Temp = data.list[24].main.temp;
    day5Temp = data.list[32].main.temp;

    desc0.style.backgroundImage = `url("${weatherDisplay(0, data)}")`;
    desc1.style.backgroundImage = `url("${weatherDisplay(8, data)}")`;
    desc2.style.backgroundImage = `url("${weatherDisplay(16, data)}")`;
    desc3.style.backgroundImage = `url("${weatherDisplay(24, data)}")`;
    desc4.style.backgroundImage = `url("${weatherDisplay(32, data)}")`;

    day0.style.background = `url("${weatherBackgroud(0, data)}")`;
    day1.style.background = `url("${weatherBackgroud(8, data)}")`;
    day2.style.background = `url("${weatherBackgroud(16, data)}")`;
    day3.style.background = `url("${weatherBackgroud(24, data)}")`;
    day4.style.background = `url("${weatherBackgroud(32, data)}")`;

    desc0.innerHTML = data.list[0].weather[0].main
    temp0.innerHTML = day1Temp + ' &deg;F';
    header0.innerHTML = (days[0].getMonth() + 1) + '-' + days[0].getDate() + '-' + days[0].getFullYear();

    desc1.innerHTML = data.list[8].weather[0].main
    temp1.innerHTML = day2Temp + ' &deg;F';
    header1.innerHTML = (days[1].getMonth() + 1) + '-' + days[1].getDate() + '-' + days[1].getFullYear();

    desc2.innerHTML = data.list[16].weather[0].main
    temp2.innerHTML = day3Temp + ' &deg;F';
    header2.innerHTML = (days[2].getMonth() + 1) + '-' + days[2].getDate() + '-' + days[2].getFullYear();

    desc3.innerHTML = data.list[24].weather[0].main
    temp3.innerHTML = day4Temp + ' &deg;F';
    header3.innerHTML = (days[3].getMonth() + 1) + '-' + days[3].getDate() + '-' + days[3].getFullYear();

    desc4.innerHTML = data.list[32].weather[0].main
    temp4.innerHTML = day5Temp + ' &deg;F';
    header4.innerHTML = (days[4].getMonth() + 1) + '-' + days[4].getDate() + '-' + days[4].getFullYear();
  })
  .catch(e => console.log(e));