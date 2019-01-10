// function makeResponsive() {
//     // Define SVG area dimensions
//     var svgWidth = 1000;
//     var svgHeight = 600;

//     // Define the chart's margins as an object
//     var margin = {
//         top: 60,
//         right: 60,
//         bottom: 60,
//         left: 60
//     };

//     // Define dimensions of the chart area
//     var chartWidth = svgWidth - margin.left - margin.right;
//     var chartHeight = svgHeight - margin.top - margin.bottom;


//     // Select div, append SVG area to it, and set its dimensions
//     var svg = d3.select("#line")
//         .append("svg")
//         .attr("width", svgWidth)
//         .attr("height", svgHeight);


//     // Append a group area, then set its margins
//     var chartGroup = svg.append("g")
//         .attr("transform", `translate(${margin.left}, ${margin.top})`);


//     // Configure a parseTime function which will return a new Date object from a string
//     var parseTime = d3.timeParse("%Y");
//     // var data = [];

//     // Load data
//     d3.json("/citation").then(function(cntData) {

//         // Throw an error if one occurs
//         // if (error) throw error;

//         // Print the citation counts
//         // console.log(cntData);

//         // Format the date and cast the cnt value to a number
//         cntData.forEach(function(data) {

//             // data.date = parseTime(data.responseDate);
//             data.date = data.responseDay;
//             data.cnt = +data.citationCnt;
//         });

//         // Configure a time scale
//         // d3.extent returns the an array containing the min and max values for the property specified

//         var xLinearScale = d3.scaleLinear()
//             .domain(d3.extent(cntData, data => data.date))
//             .range([0, chartWidth]);

//         // Configure a linear scale with a range between the chartHeight and 0
//         var yLinearScale = d3.scaleLinear()
//             .domain([d3.min(cntData, data => data.cnt), d3.max(cntData, data => data.cnt)]).nice()
//             .range([chartHeight, 0]);

//         // Create two new functions passing the scales in as arguments
//         // These will be used to create the chart's axes
//         var bottomAxis = d3.axisBottom(xLinearScale);
//         var leftAxis = d3.axisLeft(yLinearScale);

//         // Configure a line function which will plot the x and y coordinates using our scales
//         var drawLine = d3.line()
//             .x(data => xLinearScale(data.date))
//             .y(data => yLinearScale(data.cnt))
//             .curve(d3.curveMonotoneX);

//         // Append an SVG path and plot its points using the line function
//         chartGroup.append("path")


//         // The drawLine function returns the instructions for creating the line
//         .attr("d", drawLine(cntData))
//             .classed("line", true);

//         // Append an SVG group element to the chartGroup, create the left axis inside of it
//         chartGroup.append("g")
//             .classed("axis", true)
//             .call(leftAxis);

//         // Append an SVG group element to the chartGroup, create the bottom axis inside of it
//         // Translate the bottom axis to the bottom of the page
//         chartGroup.append("g")
//             .classed("axis", true)
//             .attr("transform", "translate(0, " + chartHeight + ")")
//             .call(bottomAxis);


//         // append circles
//         var circlesGroup = chartGroup.selectAll("circle")
//             .data(cntData)
//             .enter()
//             .append("circle")
//             .attr("cx", d => xLinearScale(d.date))
//             .attr("cy", d => yLinearScale(d.cnt))
//             .attr("r", "7")
//             .attr("fill", "green")
//             .attr("stroke-width", "1")
//             .attr("stroke", "black");

//         // Date formatter to display dates nicely
//         var dateFormatter = d3.timeFormat("%d-%b");

//         // Step 1: Initialize Tooltip
//         var toolTip = d3.tip()
//             .attr("class", "tooltip")
//             .offset([80, -40])
//             .html(function(d) {
//                 return (`${d.cnt}`);


//             }); // Step 2: Create the tooltip in chartGroup.
//         chartGroup.call(toolTip);

//         // Step 3: Create "mouseover" event listener to display tooltip
//         circlesGroup.on("mouseover", function(d) {
//                 toolTip.show(d, this);
//             })
//             // Step 4: Create "mouseout" event listener to hide tooltip
//             .on("mouseout", function(d) {
//                 toolTip.hide(d);
//             });
//     });

// }
// // When the browser loads, makeResponsive() is called.
// makeResponsive();

// // When the browser window is resized, makeResponsive() is called.
// d3.select(window).on("resize", makeResponsive);

d3.json("/citation").then(function(cntData) {

    console.log(cntData);

    var timeArray = [];
    var lineArray = [];
    // multiply last days of month by ratio due to less occurances
    var days2930 = 12/11;
    var day31 = 12/7;
  
    console.log(day31);
    for (var i = 0; i < cntData.length; i++) {

        timeArray.push(cntData[i].responseDay);
        if (i < 28) { 
            lineArray.push(cntData[i].citationCnt);
        } else if (i < 30) {
            lineArray.push(Math.round(cntData[i].citationCnt * days2930));
            console.log("29,30",lineArray)
        } else {
            lineArray.push(Math.round(cntData[i].citationCnt * day31)); 
            console.log("31",lineArray)
        }
    }
    console.log(timeArray);
new Chart(document.getElementById("myChart"), {
        type: 'line',
        data: {
          labels: timeArray,
          datasets: [{ 
              data: lineArray,
              label: "Traffic Stops",
              borderColor: "#3e95cd",
              fill: true
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Police Stop Count by Day (2018)'
          }
        }
    })
});


