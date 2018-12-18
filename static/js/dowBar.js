// display 2 bar charts for comparison
// choice is which neighborhoods will be graphed

choice1 = "Whittier";
choice2 = "Near - North";

d3.csv("../static/data/dow_bar2.csv").then(function (response){
  // if (error) throw error;
 
   console.log(response);

   // 6 traces for 2 bar graphs
var male1 = {
  x: ['Sun', 'Mon', 'Tue', 'Wed','Thu','Fri','Sat'],
  y: [0,0,0,0,0,0,0],
  name: 'Male',
  type: 'bar'
};

var female1 = {
  x: ['Sun', 'Mon', 'Tue', 'Wed','Thu','Fri','Sat'],
  y: [0,0,0,0,0,0,0],
  name: 'Female',
  type: 'bar'
};

var other1 = {
  x: ['Sun', 'Mon', 'Tue', 'Wed','Thu','Fri','Sat'],
  y: [0,0,0,0,0,0,0],
  name: 'Other',
  type: 'bar'
};
var male2 = {
  x: ['Sun', 'Mon', 'Tue', 'Wed','Thu','Fri','Sat'],
  y: [0,0,0,0,0,0,0],
  name: 'Male',
  type: 'bar'
};

var female2 = {
  x: ['Sun', 'Mon', 'Tue', 'Wed','Thu','Fri','Sat'],
  y: [0,0,0,0,0,0,0],
  name: 'Female',
  type: 'bar'
};

var other2 = {
  x: ['Sun', 'Mon', 'Tue', 'Wed','Thu','Fri','Sat'],
  y: [0,0,0,0,0,0,0],
  name: 'Other',
  type: 'bar'
};


// loop through data and save to y values above for plotting 
  response.forEach(function (d) {
    // convert string to number
    d.dow= +d.dow;
    d.genderCount= +d.genderCount;

 
    if (d.neighborhood === choice1 ) {
 
      if (d.gender === "Female"){
       female1.y[d.dow]= d.genderCount
      } else if (d.gender === "Male"){
        male1.y[d.dow] = d.genderCount
      } else if (d.gender === "Other"){
        other1.y[d.dow] = d.genderCount
      }
      } else if (d.neighborhood=== choice2){
  
        if (d.gender === "Female"){
          female2.y[d.dow]= d.genderCount
        } else if (d.gender === "Male"){
          male2.y[d.dow] = d.genderCount
        } else if (d.gender === "Other"){
          other2.y[d.dow] = d.genderCount
        }
      }   
     })
  
    // plot two bar graphs
    
  var data = [male1,other1,female1];
  
  var layout = {barmode: 'stack',title:choice1};
  
  Plotly.newPlot('bar', data, layout);


  
  var data2 = [male2, other2, female2];
  
  var layout2 = {barmode: 'stack', title:choice2};
  
  Plotly.newPlot('bar2', data2, layout2);
});