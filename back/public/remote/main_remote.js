var socket = io.connect();

function buttonClicked(){
    socket.emit('clicked');
}
