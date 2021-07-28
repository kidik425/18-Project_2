////////////////////////////////////////////////////
// Input files
const dispQuery = 'static/data/disp.geojson'
const crimesQuery = "static/data/crime.geojson"
const crimeTypeQuery = "static/data/crime_grouped.json"


////////////////////////////////////////////////////
// Year list/array
var year = [2019, 2018, 2017, 2016, 2015, 2014, 2013, "Time Lapse"];


////////////////////////////////////////////////////
// Legend Categories
const legCategories = ['-10—9', '10—29', '30—49', '50—69', '70—89', '90+']


////////////////////////////////////////////////////
// Chart configuration
// layout for the bar chart
const barLayout = {
  title: {
    font: {
      size: 16
    }
  },
  font: {
    size: 12
  },
  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 50,
    pad: 4
  },
  height: 300,
  xaxis: {
    tickangle: 45
  },
  yaxis:{
    showgrid: false,
    showline: false
  }
};

// layout for line chart
const lineLayout = {
  title: {
    font: {
      size: 16
    }
  },
  height: 250,
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 75,
    pad: 4
  }
};

////////////////////////////////////////////////////
// icon properties
const icon = {
  iconUrl: 'static/images/weed_map_icon.png',
  iconSize: [20, 20], // width and height of the image in pixels
  shadowSize: [35, 20], // width, height of optional shadow image
  iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
  shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
  popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
};


////////////////////////////////////////////////////
// choropleth style used in the style()
const choroWeight = 2;
const choroOpacity = 1;
const choroColor = 'white';
const choroDashArray = '3';
const choroFillOpacity = 0.7;


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