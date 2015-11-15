// config the db

//  mongod --replSet test

/*
    in mongo.exe

    var config = {_id: "test", members: [{_id: 0, host: "127.0.0.1:27017"}]}
    rs.initiate(confih)
*/
var express = require("express");
var app = express();
var server = require('http').Server(app);

var aggregator = require("./aggregator");

var io = require('socket.io')(server);
var exphbs = require("express3-handlebars");
//set handlebars as a view engine
app.engine("handlebars",
            exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//serving static
app.use("/public", express.static('public'));

//Data manipulating
var processData = function(document) {
    //console.info(document);
    if ( document.name == "clear" ) {
        aggregator.reset();
    } else {
        aggregator.addData(document);
    }
    console.log(aggregator.aggregate());
    // TODO push to clients only every x milliseconds
    io.emit('newData', aggregator.aggregate() );

    //dispatcher.emit( aggregator.aggregate() );
};

//setting up some routes
app.get("/", function(req, res){
    res.render("index", {
        index: "active",
    });
});
app.get("/info", function(req, res){
    res.render("info", {
        info: "active"
    });
});

app.get("/archive", function(req, res){
    res.render("archive", {
        archive: "active"
    });
});

app.get("/tst", function(req, res){
    res.sendfile(__dirname + "/public/index.html");
})

//start server
var port = process.env.PORT || 80;

server.listen(port, function() {
    console.log("listening on port... " + port);
});

//mongodb listener
var OplogWatcher = require('mongo-oplog-watcher');
var oplog = new OplogWatcher({
    host:"127.0.0.1" ,ns: "test.metrics"
});

oplog.on('insert', function(doc) {
    // console.info(doc);
    processData(doc);
});

//sockets

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("a user disconnected");  
  });
});


