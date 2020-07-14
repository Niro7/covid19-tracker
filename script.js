window.onload = () => {
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
const showDataInTable = (data) => {
  var html = "";
  data.forEach((country) => {
    html += `
        <tr>
            <td>${country.country}</td>
            <td>${numeral(country.cases).format("0,0")}</td>
        </tr>
        `;
  });
  document.getElementById("table-data").innerHTML = html;
};
