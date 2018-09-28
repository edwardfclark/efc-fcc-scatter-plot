function generateTooltip(d) {
    let html = "<p>";

    html += d["Name"]+": "+d["Nationality"]+"<br/>";
    html += "Year: "+d["Year"]+", Time: "+d["Time"];
    d["Doping"] === "" ? html = html : html+="<br/><br/>"+d["Doping"];
    html+="</p>";
    return html;
}

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
        const yScale = d3.scaleLinear().domain([timeMax+5, timeMin-5]).range([height-padding, 0+padding]);

        //X and Y Axis constants, used when the axes are called later in the program.
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        const yAxis = d3.axisLeft(yScale).tickFormat((d) => {
            return d%60 < 10 ? `${Math.floor(d/60)}:0${d%60}`: `${Math.floor(d/60)}:${d%60}`;
        });

        //Tooltip appended to body.
        const div = d3.select("body").append("div").attr("class", "tooltip").attr("id", "tooltip").style("opacity", 0);

        //The dot elements in the graph.
        svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d["Year"]))
        .attr("cy", (d) => yScale(d["Seconds"]))
        .attr("data-xvalue", (d) => d["Year"])
        .attr("data-yvalue", (d) => d["Seconds"])
        .attr("r", 7)
        .attr("fill", (d) => d["Doping"] === "" ? "orange" : "navy")
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        //Tooltip is made visible on mouseover.
        .on("mouseover", (d) => {
            div.transition().duration(200).style("opacity", .9);
            div.html(generateTooltip(d))
            .style("left", (d3.event.pageX+10)+"px")
            .style("top", (d3.event.pageY - 28)+"px")
            .attr("data-year", d["Year"]);
        })
        .on("mouseout", (d) => {
            div.transition().duration(500).style("opacity", 0);
        });

        //X Axis.
        svg.append("g")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .attr("id", "x-axis")
        .call(xAxis);

        //Y Axis.
        svg.append("g")
        .attr("transform", "translate(" + (padding) +", 0)")
        .attr("id", "y-axis")
        .call(yAxis);

        //Chart title & Subtitle.
        svg.append("text")
        .attr("id", "title")
        .attr("x", width/2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .text("Doping in Professional Bicycle Racing");

        svg.append("text")
        .attr("id", "subtitle")
        .attr("x", width/2)
        .attr("y", 45)
        .attr("text-anchor", "middle")
        .attr("class", "subtitle")
        .text("35 Fastest Times Up Alpe d'Huez");

        //Legend. 
        //First, create the legend group, then append the text and rects to it.

        svg.append("g").attr("id", "legend");

        d3.select("#legend").append("rect")
        .attr("x", width-padding-20)
        .attr("y", 200)
        .attr("fill", "navy")
        .attr("width", 20)
        .attr("height", 20);

        d3.select("#legend").append("rect")
        .attr("x", width-padding-20)
        .attr("y", 225)
        .attr("fill", "orange")
        .attr("width", 20)
        .attr("height", 20);

        d3.select("#legend").append("text")
        .attr("x", width-padding-220)
        .attr("y", 215)
        .text("Riders with doping allegations");

        d3.select("#legend").append("text")
        .attr("x", width-padding-240)
        .attr("y", 240)
        .text("Riders without doping ellegations");

    }

    

});