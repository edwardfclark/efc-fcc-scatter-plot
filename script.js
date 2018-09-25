document.addEventListener("DOMContentLoaded", function() {

    let request = new XMLHttpRequest();
    request.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", true);
    request.send();

    //Funciton to execute when the asynchronous request, defined earlier, finishes loading.
    request.onload = function() {
        const dataset = JSON.parse(request.responseText);
        
        //Useful constants for defining the SVG element.
        const width = 1000;
        const height = 500;
        const padding = 50;
        const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

        //Min and Max values for use in the scale.
        const yearMin = d3.min(dataset, (d) => d["Year"]);
        const yearMax = d3.max(dataset, (d) => d["Year"]);
        const timeMin = d3.min(dataset, (d) => d["Seconds"]);
        const timeMax = d3.max(dataset, (d) => d["Seconds"]);

        //Scales.
        const xScale = d3.scaleLinear().domain([yearMin-1, yearMax]).range([0+padding, width-padding]);
        const yScale = d3.scaleLinear().domain([timeMax, timeMin-5]).range([height-padding, 0+padding]);

        //X and Y Axis constants, used when the axes are called later in the program.
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        //The dot elements in the graph.
        svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d["Year"]))
        .attr("cy", (d) => yScale(d["Seconds"]))
        .attr("r", 5)
        .attr("fill", (d) => d["Doping"] === "" ? "orange" : "navy");

        //X Axis.
        svg.append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

        //Y Axis.
        svg.append("g")
        .attr("transform", "translate(" + (padding) +", 0)")
        .call(yAxis);

        //Only used for testing, delete later.
        document.getElementById("content").innerHTML = timeMax;
    }

    

});