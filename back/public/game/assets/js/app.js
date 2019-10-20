var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var playerImg = new Image();
playerImg.src =  "assets/imgs/player.png";
var socket = io.connect();

socket.on('buttonUpdate', function(){
  player.color = getRandomRgb()
});
socket.on('newBomb', function(){
    new Bomb();
});

var 
  keys = [],
  pause= false,
  bombs = [],
    platforms=[],
  width = window.innerWidth,
  height = window.innerHeight,
  player = new Player(),
  bomb = new Bomb(),
  friction = 0.9,
  gravity = 0.4,
  bomb = new Bomb(),
  platform  = new Platform(0,(height-50),width,65);

canvas.width = width;
canvas.height = height;

var loop = function() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle='rgb(0,0,0)';
  ctx.fillRect(0,0,width, height)

  
  bombs.forEach(bomb => {
    bomb.draw();
  });
  platforms.forEach(platform=>{
    platform.draw()
  });

  player.draw();
  

  if (!pause) {
    requestAnimationFrame(loop);
  }
}

loop();