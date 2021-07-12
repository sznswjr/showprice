var editTable = document.getElementById("pricetable");

function addrow(tokenarr, id, tokenname) {
    var tr = document.createElement("tr");

    var td0 = document.createElement("td");
    td0.innerHTML = id + 1;

    var td1 = document.createElement("td");
    td1.innerHTML = tokenname;

    var td2 = document.createElement("td");
    td2.innerHTML = tokenarr[tokenarr.length-1].exchangeRate;

    var td3 = document.createElement("td");
    td3.innerHTML = (tokenarr[tokenarr.length-1].exchangeRate - tokenarr[0].exchangeRate)/tokenarr[0].exchangeRate;

    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    editTable.appendChild(tr);
}

$.getJSON("./js/tokenlist.json", function (tokenlist_origin) {
    for (var i = 0; i < tokenlist_origin.length; i++) {
        (function (tokenname, id) {
            $.getJSON("./js/" + tokenname + ".json", function (tokenarr) {
                addrow(tokenarr, id, tokenname);
            });
        })(tokenlist_origin[i].name, i)
    }
})

