//var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const dispQuery = 'static/data/disp.geojson'
const crimesQuery = "http://s3-us-west-2.amazonaws.com/boundaries.latimes.com/archive/1.0/boundary-set/la-county-law-enforcement-reporting-districts.geojson" // "static/data/crime2013.geojson"

var dispensaries = L.layerGroup();
var crime = L.layerGroup();


////////////////////////////////////////////////////
// Define map layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "streets-v11",
    accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

var grayscalemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});


////////////////////////////////////////////////////
// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Grayscale Map": grayscalemap
};


////////////////////////////////////////////////////
// Create overlay object to hold our overlay layer
var overlayMaps = {
    Dispensaries: dispensaries,
    Crime: crime
};


////////////////////////////////////////////////////
// Map disp data
d3.json(dispQuery).then(function (data) {
    // Define a function we want to run once for each feature in the features array
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.business_name +
            "</h3><hr><p>" + new Date(feature.properties.location_start_date) + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Add GeoJSON to the earthquakes layergroup
    L.geoJSON(data.features, {
        onEachFeature: onEachFeature
    }).addTo(dispensaries);
});


//////////////////////////////////////////////////
// Map crime data
d3.json(crimesQuery).then(function (data) {
    // console.log(data)
    // Creating style for the choropleth

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.crime_counts),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        }
    }

    // Create a GeoJSON layer containing the features array on the techtonicData object
    // Add GeoJSON to the techtonics layergroup
    L.geoJSON(data.features, { style: style }).addTo(crime)

});

// Create Map
var myMap = L.map("map", {
    center: [34.0522, -118.30],
    zoom: 11,
    layers: [streetmap, dispensaries, crime] //ORDERING THIS SO THAT THE TOOLTIPS WORK
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);


function getColor(counts) {
    var color;

    if (counts < 2) { color = '#33FF61' }
    else if (counts < 3) { color = '#DDFF33' }
    else if (counts < 4) { color = '#FFE333' }
    else if (counts < 6) { color = '#E6b52E' }
    else if (counts < 10) { color = '#CC9329' }
    else { color = '#A35322' }

    return color;
}


function getColor(category) {
    var color;

    if (category === '-10—9') { color = '#33FF61' }
    else if (category === '10—29') { color = '#DDFF33' }
    else if (category === '30—49') { color = '#FFE333' }
    else if (category === '50—69') { color = '#E6b52E' }
    else if (category === '70—89') { color = '#CC9329' }
    else { color = '#A35322' }

    return color;
}


////////////////////////////////////////////////////
// // LEGEND
// // Create a legend to display information about our map
// var legend = L.control({ position: "bottomright" });

// // When the layer control is added, insert a div with the class of "legend"
// legend.onAdd = function () {
//     var div = L.DomUtil.create("div", "legend");
//     categories = ['-10—9', '10—29', '30—49', '50—69', '70—89', '90+'];

//     div.innerHTML += '';
//     for (var i = 0; i < categories.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(categories[i]) + '"></i> ' +
//             (categories[i] ? categories[i] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(myMap);