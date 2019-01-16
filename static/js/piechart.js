function initTrace(name) {

    var trace = {

    labels: ["citation", "stops"],
   
    values: [],

    type: 'pie'
 };

 var data = [trace];
 var layout = {
   title: "Citation Issued Vs. Stop by Neighborhood",
};

return trace;
}

function buildChart (choice, graphId) {

    d3.csv("clean_data_stop.csv").then(function (response){
    
    console.log(response);
  
    console.log("choice",choice);

//initialize traces for pie charts

       var male = initTrace('Male');
       var female = initTrace('Female');
       var other = initTrace('Other');

       response.forEach(function (d) {

        // convert string to number
        d.responseCitationIssued= +d.responseCitationIssued;
        d.genderCount= +d.genderCount;
    
        if (d.neighborhood === choice ) {
          if (d.gender === "Female"){
          female.y[d.responseCitationIssued]= d.genderCount
          } else if (d.gender === "Male"){
            male.y[d.responseCitationIssued] = d.genderCount
          } else if (d.gender === "Other"){
            other.y[d.responseCitationIssued] = d.genderCount
          }
        }        
      });

      var data = [male,other,female];
      var layout = {};    
      Plotly.react(graphId, data, layout);
 
    Plotly.react(data, layout);

      function initPage(){
        var selector1 = d3.select("#selDataset1");
        var selector2 = d3.select("#selDataset2");

        console.log("init");
