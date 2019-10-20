var socket = io.connect();

function buttonClicked(){
    console.log('hey');
    socket.emit('clicked');
}

//when we receive numClients, do this
socket.on('buttonUpdate', function(data){
    document.getElementById("buttonCount").innerHTML = 'The button has been clicked ' + data + ' times.';
});