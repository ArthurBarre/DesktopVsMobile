var express = require('express');
var app = express();
var clickCount = 0;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static('public/'))

app.get('/remote',function(req,res,next){
    res.sendFile(__dirname+'/public/remote/remote.html')
});

app.get('/game',function(req,res,next){
    res.sendFile(__dirname+'/public/game/game.html')
});

io.on('connection', function(client) {
    console.log('Client connected...');
    //when the server receives clicked message, do this
    client.on('clicked', function(data) {
        clickCount++;
        //send a message to ALL connected clients
        io.emit('buttonUpdate', clickCount);
    });
});

//start our web server and socket.io server listening
server.listen(3000, function(){
    console.log('listening on *:3000');
}); 