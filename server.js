// Imports go here /////////////////////////////////////////////
var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var lastPosition = { x: 0, y: 0 };
var fs = require('fs')
//////// Configurations Go Here /////////////////////////////////
app.use(express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
////////// Sockets Go Here //////////////////////////////////////
io.sockets.on('connection', function (socket) {
  console.log("Working now?");
  socket.broadcast.emit('update_position', lastPosition);
  socket.on('receive_position', function (data) {
    lastPosition = data;
    socket.broadcast.emit('update_position', data);
  });
});
////////// Routes Go Here ///////////////////////////////////////
app.get("/", function (req, res) {
  console.log("Time To Play Checkers!");
  res.sendFile(__dirname + '/index.html');
  res.render("index");
});

//////////////////////
server.listen(8000, function () {
  console.log(`Listening on ${server.address().port}`);
});
