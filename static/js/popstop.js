// 

//*************************************** */
// function to build a bar chart with 
// 'choice' = neighborhood selected 
// 'graphId' id for location in the html
function initPage () {
  d3.json("/neighborhood").then((response) => {
  
  console.log(response);
  var hoodsA=[];
  var stoppopA=[];
  var hoodsB=[];
  var stoppopB=[];
  var counter = 0;
  // loop through data and save to y values above for plotting 
    response.forEach(function (d) {
      d.totalPop= +d.totalPop
      d.stopCnt= +d.stopCnt
      if (counter < 44) {
      hoodsA.push(d.neighborhood);
      stoppopA.push(d.stopCnt / d.totalPop);
      } else {
        hoodsB.push(d.neighborhood);
        stoppopB.push(d.stopCnt / d.totalPop);
      }  
      counter++
    })
    var tracePopA = {
      x: hoodsA,
      y: stoppopA,
      name: 'Stop / Population Ratio',
      type: 'bar'
    };

      var tracePopB = {
      x: hoodsB,
      y: stoppopB,
      name: 'Stop / Population Ratio',
      type: 'bar'
    };

    // plot bar graph 
  var dataA = [tracePopA];
  var layoutA = {barmode: 'group',title:'A - L Neighborhoods'};    
  Plotly.newPlot('bar3', dataA, layoutA);

  var dataB = [tracePopB];
  var layoutB = {barmode: 'group',title:'L - W Neighborhoods'};    
  Plotly.newPlot('bar4', dataB, layoutB);
  });

}



initPage();
