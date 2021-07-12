/* globals Chart:false, feather:false */

function gettimelist(tokenarr) {
  var timelist = new Array();
  for (var i = 0; i < tokenarr.length; i++) {
    timelist[i] = tokenarr[i].modifytime;
  }
  return timelist;
}

function getratelist(tokenarr) {
  var ratelist = new Array();
  for (var i = 0; i < tokenarr.length; i++) {
    ratelist[i] = tokenarr[i].exchangeRate;
  }
  return ratelist;
}

function paintchart(tokenname) {
  $.getJSON("./js/" + tokenname + ".json", function (tokenarr) {
    'use strict'

    feather.replace()

    var timelist = gettimelist(tokenarr);
    var ratelist = getratelist(tokenarr);


    // Graphs
    var ctx = document.getElementById(tokenname)
    // eslint-disable-next-line no-unused-vars
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timelist,
        datasets: [{
          data: ratelist,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: false
        }
      }
    })
  })
}

$.getJSON("./js/tokenlist.json", function (tokenlist_origin) {
  for (var i = 0; i < tokenlist_origin.length; i++) {
    paintchart(tokenlist_origin[i].name);
  }
})