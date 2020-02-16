var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 80;

http.listen(port, function(){
  console.log('listening on *:' + port);
});

app.use(express.static(__dirname + '/frontend/build'));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('roll_message', (payload) => {
    console.log(payload);
    io.emit(payload.broadcastName, payload);
  })
});

