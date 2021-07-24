import populateBar from './barchart.js'; 

//var queryUrl = "https://data.lacity.org/resource/bunu-zsyc.geojson"

var queryUrl = 'static/data/disp.geojson' 

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log (data)
});

function createFeatures(dispensaryData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.business_name+
    "</h3><hr><p>" + new Date(feature.properties.location_start_date) + "</p>");
  }

var dispensaries = L.geoJSON(dispensaryData, {
  onEachFeature: onEachFeature
});

createMap(dispensaries);
}
function createMap(dispensaries) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Dispensaries: dispensaries
  };

var myMap = L.map("map", {
  center: [34.0522, -118.30],
  zoom: 11,
  layers: [streetmap, dispensaries]
});

//create a filter for stores opened before 2019 (in order to correlate with crime data)
// var dispData = L.geoJson(queryUrl, {filter: dispensaryFilter}).addTo(map);

// function dispensaryFilter(feature) {
//   if (feature.properties.location_start_date === "before 2019-01-01") return true
// };

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
}