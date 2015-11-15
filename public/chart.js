//var socket = io();

var temp, tm;
var temparr = [];
var tempobj = {};
setInterval(function(){
    tm = new Date();
    tm = tm.getTime() / 1000;
    temp = 23 + Math.floor(Math.random() * 4);        
}, 1000);

// socket.on("newData", function(metrics) {
//     temp = metrics.y; // get temperature from json file send via websocket
//     tm = metrics.time; // same for time
// });


var pushChartData = function(temp, tm) {
    nextDataPoint = [ {time: tm, y: temp } ];
    myChart.push(nextDataPoint);
};

var data = [
    {
        label: "Series 1",
        values: [ {time: 000000, y: 0} ]
    }
];

var myChart = $('#chart').epoch({
    type: 'time.line',
    data: data,
    axes: ['left', 'right', 'bottom'],
    ticks: { time: 5, right: 5, left: 5 }
});

setInterval(function() {
    pushChartData(temp, tm);
}, 1000);
    
    