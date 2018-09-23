document.addEventListener("DOMContentLoaded", function() {

    let request = new XMLHttpRequest();
    request.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", true);
    request.send();
    request.onload = function() {
        const dataset = JSON.parse(request.responseText);
        

        const width = 1000;
        const height = 500;
        const padding = 50;
        const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

        const yearMin = d3.min(dataset, (d) => d["Year"]);
        const yearMax = d3.max(dataset, (d) => d["Year"]);
        const timeMin = d3.min(dataset, (d) => d["Seconds"]);
        const timeMax = d3.max(dataset, (d) => d["Seconds"]);

        const xScale = d3.scaleLinear().domain([yearMin-1, yearMax]).range([0+padding, width-padding]);
        const yScale = d3.scaleLinear().domain([timeMax, timeMin-5]).range([height-padding, 0+padding]);

        svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d["Year"]))
        .attr("cy", (d) => yScale(d["Seconds"]))
        .attr("r", 5);

        document.getElementById("content").innerHTML = timeMax;
    }

    

});