const mymap = L.map('map').setView([51.505, -0.09], 13);
const attribution = 
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreet</a>'

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tile = L.tileLayer(tileUrl, { attribution });
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

tile.addTo(mymap);

const makerIcon = L.icon({
    iconUrl: 'images\icon-location.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
});
const maker = L.maker([0, 0], {icon: makerIcon}) .addTo(mymap);

const ipDisplay = document.getElementByClassName("ip_address")
const locationDisplay = document.getElementByClassName("location_value")
const timezoneDisplay = document.getElementByClassName("time_zone_value")
const ispDisplay = document.getElementByClassName("isp_value")

document.getElementsByClassName("searchBar").addEventListener("submit",(e) =>{
    e.preventDefault();
    var userInput = e.target[0].value;
    main(userInput);
})

function main(ipAddress){
    const ip = ipAddress;
    const api_key = 'at_CoRFyQs79R2MZG3clKKjVOZAZ4NPe';
    const api_url = 'https://geo.ipify.org/api/v2/country,city?';
    const url = api_url +'apiKey = ' + api_key + '&ipAddress ='+ ip;


fetch (url)
.then(res =>{
    return res.json();
})
.then(res =>{
    displayInfo(res);
    displayMap(res);
})
}

function displayInfo(res){
    ipDisplay.innerText = res.ip;
    locationDisplay.innerText = res.location.city + "" + res.location.country + "" + res.location.postalCode;
    timezoneDisplay.innerText = "UTC" + res.location.timezone;
    ispDisplay.innerText = res.isp;
}

function displayMap(res){
    mymap.setView([res.location.lat, res.location.lng], 13);
    maker.setLatLng([res.location.lat, res.location.lng], 13);
}