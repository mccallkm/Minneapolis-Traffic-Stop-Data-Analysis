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
        // console.log(id,citations,gender)

        var data = [{
          labels:citations,
          values:id,
          
          type: "pie"

      }];

      var layout = {
        margin:{t:0,4:6},
        height: 500,
        width: 700,
        title: "Citation Issued Vs Stops",

    };

    Plotly.newPlot("pie", data, layout);});}
 
function init()
            {
  var selector=d3.select("#selDataset1");
  d3.json("/neighborhoodj").then((sampleNames) => {
  sampleNames.forEach((entry) => {
        selector
        .append("option")
        .text(entry)
        .property("value",entry);
});

  const newSample=sampleNames[0];
  console.log(newSample)
  optionChanged(newSample);
  buildCharts(newSample);
});
}

function optionChanged(newSample) {

}

// // Initialize the dashboard
init();
