document.addEventListener("DOMContentLoaded", function() {

    let request = new XMLHttpRequest();
    request.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", true);
    request.send();
    request.onload = function() {
        let json = JSON.parse(request.responseText);
        document.getElementById("content").innerHTML = JSON.stringify(json);
        
    }

    

});