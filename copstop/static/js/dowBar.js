// display 2 bar charts for comparison
// 

//*********************************************** */
// function to initialize the graph trace values since they 
// are mostly the same except 'name'
function initTrace( name){
  var trace = {
    x: ['Sun', 'Mon', 'Tue', 'Wed','Thu','Fri','Sat'],
    y: [0,0,0,0,0,0,0],
    name: name,
    type: 'bar'
  };
  return trace;
}

//*************************************** */
// function to build a bar chart with 
// 'choice' = neighborhood selected 
// 'graphId' id for location in the html
function buildChart (choice, graphId) {
  d3.json("/dow").then(function (response){
  
  console.log(response);
  console.log("choice",choice);

    //initialize traces for bar graphs
    var male = initTrace('Male');
    var female = initTrace('Female');
    var other = initTrace('Other');

  // loop through data and save to y values above for plotting 
    response.forEach(function (d) {
      // convert string to number
      d.responseDow= +d.responseDow;
      d.genderCount= +d.genderCount;
  
      if (d.neighborhood === choice ) {
        if (d.gender === "Female"){
        female.y[d.responseDow]= d.genderCount
        } else if (d.gender === "Male"){
          male.y[d.responseDow] = d.genderCount
        } else if (d.gender === "Other"){
          other.y[d.responseDow] = d.genderCount
        }
      }        
    })

    // plot bar graph 
  var data = [male,other,female];
  var layout = {barmode: 'stack',title:choice};    
  Plotly.newPlot(graphId, data, layout);
  });

}

//****************************************************** */
// add neighborhood list to html for graph 1 and 2and 
//build chart with first 2 neighborhoods
function initPage(){
  var selector1 = d3.select("#selDataset1");
  var selector2 = d3.select("#selDataset2");
  //console.log("init");
  // Use the list of sample names to populate the select options
  d3.json("/neighborhood").then((response) => {
    response.forEach((entry) => {
      selector1
        .append("option")
        .text(entry.neighborhood)
        .property("value", entry.neighborhood);
    });

    response.forEach((entry) => {
      selector2 
        .append("option")
        .text(entry.neighborhood)
        .property("value",entry.neighborhood);
    })

    var choice=response[0].neighborhood;
    buildChart(choice,'bar1');
    choice=response[0].neighborhood;
    buildChart(choice,'bar2'); 
  })

}

//******************************************************* */
// a new neighborhood has been selected 'graph' indicates 
// which graph needs to be updated
function selectChanged (newNeighborhood,graph){

  if(graph === '1'){
    buildChart(newNeighborhood,'bar1')
  } else if (graph === '2'){
    buildChart(newNeighborhood,'bar2')
  }


}


initPage();
