# efc-fcc-scatter-plot

The goal of this project is to visialize data with a scatter plot graph using AJAX calls and the D3 library.

User Story:

1) There's an element with a corresponding id="title".
2) There is an x-axis with a corresponding id="x-axis".
3) There is a y-axis with a corresponding id="y-axis".
4) There are dots, each of which has a class of "dot", which represent the data being plotted.
5) Each dot has the properties "data-xvalue" and "data-yvalue" containing their corresponding x and y values.
6) The data-xvalue and data-yvalue of each dot should be within the range of actual data and in the correct data format. For data-xvalue, integers or date objects are acceptable. For data-yvalue, use Date objects.
7) The data-xvalue and its corresponding dot should align with the correct point/value on the x-axis.
8) The data-yvalue and its corresponding dot should align with the correct point/vaue on the y-axis.
9) There are multiple tick labels on the y-axis with the %M:%S format.
10) There are multiple tick labels on the x-axis that show the year.
11) The range of the x-axis labels are within the range of the actual x-axis data.
12) The range of the y-axis labels are within the range of the actual y-axis data.
13) There is a legend with descriptive text that has id="legend".
14) If you mouse over an area, you can see a tooltip with the corresponding id="tooltip" which displays more information about the area.
15) The tooltip should have a "data-year" property that corresponds to the data-xvalue of the active area.

This is the actual dataset to be used in the AJAX call: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json

