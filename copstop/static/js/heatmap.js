// var mymap = L.map('heatmap', {
//   center: [44.9778, -93.2650], 
//   zoom: 11.5,
//   zoomControl: false
// });


// var link = "https://opendata.arcgis.com/datasets/215b4b543d894750aef86c725b56ee2a_0.geojson";

// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.light",
//     accessToken: API_KEY
// }).addTo(mymap);

// L.control.zoom({
//   position: 'bottomleft'
// }).addTo(mymap);

// d3.json("/stop", function(data) {
//   coords = data.features.map(feat => feat.geometry.coordinates.slice().reverse())
//   var heat = L.heatLayer(coords,{
//     radius: 20,
//     blur: 35
//   }).addTo(mymap);
// });












var mymap = L.map('heatmap', {
  center: [44.9778, -93.2650], 
  zoom: 11.5,
  zoomControl: false
});


// var link = "https://opendata.arcgis.com/datasets/215b4b543d894750aef86c725b56ee2a_0.geojson";

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(mymap);

L.control.zoom({
  position: 'bottomleft'
}).addTo(mymap);

// d3.json(link, function(data) {
//   coords = data.features.map(feat => feat.geometry.coordinates.slice().reverse())
//   var heat = L.heatLayer(coords,{
//     radius: 20,
//     blur: 35
//   }).addTo(mymap);
// });


d3.json("/stop", function(response) {

  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    // var location = response[i].location;

    if (response) {
      heatArray.push([response[i].lat, response[i].lon]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(mymap);

});