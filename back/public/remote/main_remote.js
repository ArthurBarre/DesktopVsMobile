var socket = io.connect();

function buttonClicked(){
    console.log('test');
    socket.emit('clicked');
}
function newBomb(){
    socket.emit('newBomb');
}
