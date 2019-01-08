var object1 = {
  a: 'neighborhood',
  b: 'sampleNames'
 };

function buildCharts(newSample) {
    console.log("buildCharts", newSample)
    d3.json(`/pieinfo/${newSample}`).then((results) => {
        const id = results.OBJECTID;
        const citations = results.citationIssued;
        const gender = results.gender;
        console.log(id,citations,gender)

        var data = [{
          labels: id.slice(0,10),
          values: citations.slice(0,10),
          type: "pie"

      }];

      var layout = {
        margin:{t:0,1:0},
        title: "Citation Issued Vs Stops",

    };

    Plotly.newPlot("pie", data, layout);});}
 
function init()
            {
  var selector=d3.select("#selDataset1");
  d3.json("/neighborhood").then((sampleNames) => {
  sampleNames.forEach((entry) => {
        selector
        .append("option")
        .text(entry.neighborhood)
        .property("value",entry.neighborhood);
});

  const newSample=sampleNames;
  optionChanged(newSample);
  buildCharts(newSample);
});
}

function optionChanged(newSample) {
// console.log(newSample.entry);

}

// Plotly.d3.json(function (error, pieData) {

//   var citationIssued = pieData['citationIssued']
//   var OBJECTID = pieData['OBJECTID']
// });
//   var data = [{
//       values: OBJECTID,
//       labels: citationIssued,
//       type: "pie"

//   }];

//   var layout = {
//     height: 500,
//     width: 700,
//     title: "Citation Issued Vs Stops",

//  };

// Plotly.newPlot("plot1", data, layout);

// // Fetch new data each time a new sample is selected
// buildMetadata(newSample);
// buildCharts(newSample);

// // Initialize the dashboard
init();