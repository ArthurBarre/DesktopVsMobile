var express = require('express');
var app = express();
var clickCount = 0;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
app.use(express.static('public'));

app.get('/remote',function(req,res,next){
    res.sendFile(__dirname+'/public/remote/remote.html')
});

app.get('/game',function(req,res,next){
    res.sendFile(__dirname+'/public/game/game.html')
});

app.get('/editor',function(req,res,next){
    res.sendFile(__dirname+'/public/editor/editor.html')
});

io.on('connection', function(client) {
    console.log('Client connected...');
    //when the server receives clicked message, do this

    client.on('clicked', function(data) {
        //send a message to ALL connected clients
        io.emit('buttonUpdate');
    });
    client.on('newBomb', function(data) {
        //send a message to ALL connected clients
        io.emit('newBomb');
    });

    client.on('json', function(data) {
        console.log(data)
        let name = 'map'+ Date.now() + '.json';
        fs.writeFile(name, data, 'utf8', function(callback) {
            console.log(callback)
        });
        fs.rename(name, __dirname+'/public/game/assets/maps/'+name ,function(callback) {
            console.log(callback)
        });
    })
});

//start our web server and socket.io server listening
server.listen(3000, function(){
    console.log('listening on *:3000');
}); 