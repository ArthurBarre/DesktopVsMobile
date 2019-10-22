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
  width = 1200,
  height = 800,
  player = new Player(),
  friction = 0.9,
  gravity = 0.4,
  platform  = new Platform(200,600,200,50);

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