const dispQuery = 'static/data/disp.geojson'
const crimesQuery = "static/data/crime.geojson"
const crimeTypeQuery = "static/data/crime_grouped.json"

var dispensaries = L.layerGroup();
var crime = L.layerGroup();

init();

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
    "Grayscale": grayscalemap,
    "Street": streetmap,
    "Dark": darkmap
};


////////////////////////////////////////////////////
// Create overlay object to hold our overlay layer
var overlayMaps = {
    Dispensaries: dispensaries,
    Crime: crime
};


////////////////////////////////////////////////////
// Create Map
var myMap = L.map("map", {
    center: [34.0522, -118.357],
    zoom: 9.5,
    layers: [grayscalemap, dispensaries, crime] //ORDERING THIS SO THAT THE TOOLTIPS WORK
});

////////////////////////////////////////////////////
// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);


////////////////////////////////////////////////////
// Map disp data
function createDisp(yearVal) {

    d3.json(dispQuery).then(function (data) {
        // console.log(data.features)

        // Clear layer on val change
        dispensaries.clearLayers();

        // Define a function we want to run once for each feature in the features array
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.business_name +
                "</h3><hr><p>" + new Date(feature.properties.location_start_date) +
                "</p><p>" + feature.properties.street_address + "</p>");
        }

        // Create filter for year
        function yearFilter(feature) {
            if (feature.properties.location_start_year <= yearVal) return true
        }

        // replace Leaflet's default blue marker with a custom icon
        function createCustomIcon(feature, latlng) {
            let myIcon = L.icon({
                iconUrl: 'static/images/weed_map_icon.png',
                iconSize: [25, 25], // width and height of the image in pixels
                shadowSize: [35, 20], // width, height of optional shadow image
                iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
            })
            return L.marker(latlng, { icon: myIcon })
        };

        // Create a GeoJSON layer containing the features array on the dispensary object
        // Add GeoJSON to the dispensaries layergroup
        L.geoJSON(data.features, {
            onEachFeature: onEachFeature,
            filter: yearFilter,
            pointToLayer: createCustomIcon
        }).addTo(dispensaries);
    });

};


//////////////////////////////////////////////////
// Map crime data
function createCrimeChoropleth(yearVal) {
    d3.json(crimesQuery).then(function (data) {
        // Clear layer on val change
        crime.clearLayers();

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

        function filter(feature) {
            if (feature.properties.year == yearVal) return true
        }

        // Add crimes GeoJSON to the techtonics layergroup
        L.geoJSON(data.features, {
            style: style,
            filter: filter
        }).addTo(crime)

    });
}


//////////////////////////////////////////////////
// Map crime by type data
function createCrimeGraph(yearVal) {
    // Fetch the JSON data and console log it
    var listCT = [];

    d3.json(crimeTypeQuery).then((data) => {

        // console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            if (data[i].Year == yearVal) {
                listCT.push(data[i]);
            }
        }

        //Populate the barchart 
        createBar(listCT);
    });
}


//////////////////////////////////////////////////
// Map crime by year data
function createCrimeYearGraph(crimeVal) {
    // Fetch the JSON data and console log it
    var listCTY = [];

    d3.json(crimeTypeQuery).then((data) => {

        console.log(data);
        // for (var i = 0; i < data.length; i++) {
        //     if (data[i].Crime_Type == crimeVal) {
        //         listCTY.push(data[i]);
        //     }
        // }

        //Populate the barchart 
        createCrimeChart(data);
    });
}


//////////////////////////////////////////////////
// Define colors for choropleth
function getColor(counts) {
    var color;

    if (counts < 5000) { color = '#FECFCF' }
    else if (counts < 5500) { color = '#FE9F9F' }
    else if (counts < 6000) { color = '#FD504F' }
    else if (counts < 6500) { color = '#FD0100' }
    else if (counts < 7000) { color = '#b01030' }
    else if (counts < 7500) { color = '#9a0e2a' }
    else if (counts < 8000) { color = '#840c24' }
    else { color = '#6e0a1e' }

    return color;
}


////////////////////////////////////////////////////
//Populates the dropdown list
function populateDropDown(year) {
    var radioTag = document.getElementById("control");

    for (var i = 0; i < year.length; i++) {
        var newRadio = year[i];

        // Create inputs for label
        var inp = document.createElement("input")
        inp.setAttribute("class", "form-check-input");
        inp.type = "radio";
        inp.id = newRadio;
        inp.name = "year";
        inp.value = newRadio;
        inp.setAttribute("onchange", "optionChanged(this.value)");

        // Add a default checked box to the first option selected
        if (i == 0) { inp.setAttribute("checked", "checked") }

        // Add column dividers for the radio buttons
        var div = document.createElement("div");
        div.setAttribute("class", "form-check form-check-inline")
        radioTag.append(div);

        // Add new radio to control tag
        //radioTag.append(inp);
        div.append(inp);

        // Create label for the radio
        var lb = document.createElement("label");
        lb.setAttribute("class", "form-check-label");
        lb.setAttribute("for", newRadio);
        lb.textContent = newRadio;

        // Add input to the control tag
        div.append(lb);
    }

};


////////////////////////////////////////////////////
// Create bar chart
function createBar(list) {
    //Create the Traces
    const n = 10
    var crimeCounts = list.map(rec => rec.Crime_Counts);
    var crimeType = list.map(rec => rec.Crime_Type);

    var xaxis = crimeType.flat().slice(0, n) //adding flat() since there is a nested array
    var yaxis = crimeCounts.flat().slice(0, n) //appending a literal
    var text = crimeType.flat().slice(0, n)

    // console.log(xaxis); //sanity check
    // console.log(yaxis); //sanity check
    // console.log(text) //sanity check

    var trace = {
        x: xaxis,
        y: yaxis,
        text: text,
        type: "bar"
    };

    // Create the data array for the plot
    var data = [trace];

    // Define the plot layout
    var layout = {
        title: "Crime Types",
        barmode: "stack"
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("barchart", data, layout);
}


////////////////////////////////////////////////////
// Create time series chart
function createCrimeChart(list) {
    //Create the Traces
    const n = 10
    var crimeCounts = list.map(rec => rec.Crime_Counts);
    var crimeYear = list.map(rec => rec.Year);

    console.log(crimeYear)

    var xaxis = crimeYear//.flat().slice(0, n) //adding flat() since there is a nested array
    var yaxis = crimeCounts//.flat() //appending a literal
    var text = crimeYear.flat().slice(0, n)

    // console.log(xaxis); //sanity check
    // console.log(yaxis); //sanity check
    // console.log(text) //sanity check

    var trace = {
        x: xaxis,
        y: yaxis,
        text: text,
        type: "bar"
    };

    // Create the data array for the plot
    var data = [trace];

    // Define the plot layout
    var layout = {
        title: "Crime Types Year Over Year"
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("crimechart", data, layout);
}


//////////////////////////////////////////////////
// LEGEND
// Create a legend to display information about our map
var legend = L.control({ position: "bottomright" });

    // When the layer control is added, insert a div with the class of "legend"
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        categories = ['-10—9', '10—29', '30—49', '50—69', '70—89', '90+'];

        div.innerHTML += '';
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(categories[i]) + '"></i> ' +
                (categories[i] ? categories[i] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);


////////////////////////////////////////////////////
//Initializes the Dashboard
function init() {
    var val = 2019;

    var year = [2019, 2018, 2017, 2016, 2015, 2014, 2013, "Time Lapse"];

    populateDropDown(year);
    optionChanged(val);

}


////////////////////////////////////////////////////
//Captures on change values
function optionChanged(val) {
    crimeVal = ""
    if (isNaN(val) == false) {
        createDisp(val);
        createCrimeChoropleth(val);
        createCrimeGraph(val);
    } else { autoRun() }

    createCrimeYearGraph(crimeVal);
}


function autoRun() {
    optionChanged(val);
}