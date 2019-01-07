// 

//*************************************** */
// function to build a bar chart with 
// 'choice' = neighborhood selected 
// 'graphId' id for location in the html
function initPage () {
  d3.json("/neighborhood").then((response) => {
  
  console.log(response);
  var hoodsA=[];
  var stoparrayA=[];
  var poparrayA=[];
  var hoodsB=[];
  var stoparrayB=[];
  var poparrayB=[];
  var counter = 0;
  // loop through data and save to y values above for plotting 
    response.forEach(function (d) {
      if (counter < 44) {
      hoodsA.push(d.neighborhood);
      stoparrayA.push(d.stopCnt);
      poparrayA.push(d.totalPop);  
      } else {
        hoodsB.push(d.neighborhood);
        stoparrayB.push(d.stopCnt);
        poparrayB.push(d.totalPop);  
      }  
      counter++
    })
    var tracePopA = {
      x: hoodsA,
      y: poparrayA,
      name: 'Population',
      type: 'bar'
    };
    var traceStopA = {
      x: hoodsA,
      y: stoparrayA,
      name: 'Stop Count',
      type: 'bar'
    };
      var tracePopB = {
      x: hoodsB,
      y: poparrayB,
      name: 'Population',
      type: 'bar'
    };
    var traceStopB = {
      x: hoodsB,
      y: stoparrayB,
      name: 'Stop Count',
      type: 'bar'
    };
    // plot bar graph 
  var dataA = [tracePopA, traceStopA];
  var layoutA = {barmode: 'group',title:'A - L Neighborhoods'};    
  Plotly.newPlot('bar1', dataA, layoutA);

  var dataB = [tracePopB, traceStopB];
  var layoutB = {barmode: 'group',title:'L - W Neighborhoods'};    
  Plotly.newPlot('bar2', dataB, layoutB);
  });

}



initPage();
