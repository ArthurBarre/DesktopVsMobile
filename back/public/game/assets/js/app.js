var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var socket = io.connect();

socket.on('buttonUpdate', function(){
  player.color = getRandomRgb()
});

var 
  keys = [],
  pause= false,
  width = window.innerWidth,
  height = window.innerHeight,
  player = new Player(),
  friction = 0.9,
  gravity = 0.4;

canvas.width = width;
canvas.height = height;

var loop = function() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle='rgb(0,0,0)';
  ctx.fillRect(0,0,width, height)

  

  player.draw()
  

  if (!pause) {
    requestAnimationFrame(loop);
  }
}

loop();