var editchart = document.getElementById("chartlist");

function addchart(tokenname) {
    var div = document.createElement("div");

    div.innerHTML = "<h2 class=\"h3\">"+tokenname+"</h2>\
    <canvas class=\"my-4 w-100\" id=\""+tokenname+"\" width=\"900\" height=\"380\"></canvas>"

    editchart.appendChild(div);
}

$.getJSON("./js/tokenlist.json", function (tokenlist_origin) {
    for (var i = 0; i < tokenlist_origin.length; i++) {
        addchart(tokenlist_origin[i].name);
    }
})