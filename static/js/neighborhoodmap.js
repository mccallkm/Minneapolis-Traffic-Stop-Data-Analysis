var mymap = L.map('map', {
  center: [44.975998, -93.264554], 
  zoom: 11.5,
  zoomControl: false
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.light',
  accessToken: API_KEY
}).addTo(mymap);

L.control.zoom({
  position: 'bottomleft'
}).addTo(mymap);

var link = "https://opendata.arcgis.com/datasets/7f88316841ce471faa33c89035fb69e8_0.geojson";

  
d3.json(link, function(data) {
// Creating a geoJSON layer with the retrieved data
L.geoJson(data, {
style: function(feature) {
  return {
    color: "black",
    fillColor: "#ADD8E6",
    fillOpacity: 0.5,
    weight: 1.5
  };
},
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.BDNAME + "</h3>");
  }
  // Called on each feature
  // onEachFeature: function(feature, layer) {
  //   // Set mouse events to change map styling
  //   layer.on({
  //     // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
  //     mouseover: function(event) {
  //       layer = event.target;
  //       layer.setStyle({
  //         fillOpacity: 0.9
  //       });
  //     },
  //     // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
  //     mouseout: function(event) {
  //       layer = event.target;
  //       layer.setStyle({
  //         fillOpacity: 0.5
  //       });
  //     },
  //     // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
  //     click: function(event) {
  //       mymap.fitBounds(event.target.getBounds());
  //     }
  //   });
  //   // Giving each feature a pop-up with information pertinent to it
  //   layer.bindPopup("<h1>" + feature.properties.BDNAME + "</h1>");

  // }
}).addTo(mymap);
});



var url = "https://opendata.arcgis.com/datasets/215b4b543d894750aef86c725b56ee2a_0.geojson";


d3.json(url, function(data) {
  createFeatures(data.features);
});
function createFeatures(earthquakeData) {
  var markers = L.markerClusterGroup();
    for (var i =0; i < earthquakeData.length; i++) {
      markers.addLayer(L.marker([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]]));
        
}
  mymap.addLayer(markers);
};
