//Step 1 Create chart parameters and pull data
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 150
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

// Append SVG group
//=================================
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Append a div to the body to create tooltips, assign it a class
// d3.select(".chart")
//     .append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

// Import Data from file
d3.json("/citation")
    .then(function(data) {
        data.forEach(function(data) {
            data.city = data.neighborhood;
            data.month = +data.responseMonth;
            data.dow = +data.responseDay;
            data.cnt = +data.citationCnt;

        });

        // Step 2: Create scale functions
        // ==============================

        var xLinearScale = d3.scaleLinear()
            .domain([8, d3.max(data, d => d.cnt)])
            .range([0, width])
            .nice();

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.dow)])
            .range([height, 0])
            .nice();

        // Step 3: Create axis functions
        // ==============================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Step 4: Append Axes to the chart
        // ==============================
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        // Step 5: Create Circles
        // ==============================
        var circlesGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()

        var Circles = circlesGroup.append("circle")
            .attr("class", "state")
            .attr("cx", d => xLinearScale(d.cnt))
            .attr("cy", d => yLinearScale(d.dow))
            .attr("r", "10")
            .attr("fill", "lightblue")
            .attr("opacity", "1")
            .style("text-anchor", "end");

        var CircleText = circlesGroup.append("text")
            .attr('x', d => xLinearScale(d.cnt))
            .attr('y', d => yLinearScale(d.dow) + 5)
            .attr("class", "circleText")
            .text(function(d) {
                return d.city;
            });

        // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -50])
            .html(function(d) {
                // var city = d.neighborhood;
                // var cnt = +d.citationCnt;
                // var date = +d.responseDay;
                return (`${d.neighborhood}<hr>: ${d.cnt}<br>: ${d.dow}`);

            });
        // Step 7: Create tooltip in the chart
        // ==============================
        chartGroup.call(toolTip);

        // Step 8: Create event listeners to display and hide the tooltip
        // ==============================
        CircleText.on("mouseover", function(data) {
                toolTip.show(data, this);
            })
            // onmouseout event
            .on("mouseout", function(data, index) {
                toolTip.hide(data);
            });

        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 30)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Citation Counts");

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("Response Day/Month");
    });
