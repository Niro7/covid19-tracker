window.onload = () => {
  getWorldCoronaData();
  getCountriesData();
  //   getCountryData();
};
let coronaGlobalData;

var map;
const mapCenter = {
  lat: 34.80746,
  lng: -40.4796,
};
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: mapCenter,
    zoom: 3,
    mapTypeControl: false,
  });

  testSetMarker();
  styleSelectorControls();
}
const getCountriesData = () => {
  fetch("https://corona.lmao.ninja/v2/countries")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      coronaGlobalData = data;
      showDataInTable(data);
    });
};

const setStatsData = (data) => {
  let todayCases = data.todayCases;
  let todayRecovered = data.todayRecovered;
  let todayDeaths = data.todayDeaths;
  let totalCases = data.cases;
  let totalRecovered = data.recovered;
  let totalDeaths = data.deaths;

  document.querySelector(".total-number").innerHTML = numeral(
    todayCases
  ).format("+0,0");
  document.querySelector(".recovered-number").innerHTML = numeral(
    todayRecovered
  ).format("+0,0");
  document.querySelector(".deaths-number").innerHTML = numeral(
    todayDeaths
  ).format("+0,0");
  document.querySelector(".cases-total").innerHTML = numeral(totalCases)
    .format("0.0a")
    .toUpperCase();
  document.querySelector(".recovered-total").innerHTML = numeral(totalRecovered)
    .format("0.0a")
    .toUpperCase();
  document.querySelector(".deaths-total").innerHTML = numeral(totalDeaths)
    .format("0.0a")
    .toUpperCase();
};
const getWorldCoronaData = () => {
  fetch("https://disease.sh/v2/all")
    .then((response) => response.json())
    .then((data) => setStatsData(data));
};
const testSetMarker = () => {
  var marker = new google.maps.Marker({
    position: mapCenter,
    map: map,
    title: "Hello World!",
  });
};
const showDataInTable = (data) => {
  var html = "";
  data.forEach((country) => {
    html += `
        <tr>
            <td>
            <img
      src="${country.countryInfo.flag}"
      alt="Country flag"
      style="height: 2rem; width: 2rem; border-radius: 50%;"
    />
    &nbsp;
            ${country.country}
            </td>
            <td>${numeral(country.cases).format("0,0")}</td>
        </tr>
        `;
  });
  document.getElementById("table-data").innerHTML = html;
};
