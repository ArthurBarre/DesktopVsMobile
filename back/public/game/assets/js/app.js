var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var playerImg = new Image();
playerImg.src =  "assets/imgs/player.png";

var 
  keys = [],
  pause= false,
  bombs = [],
  width = window.innerWidth,
  height = window.innerHeight,
  player = new Player(),
  bomb = new Bomb();


canvas.width = width;
canvas.height = height;

var remote1 = function() {
  player.color = getRandomRgb();
}

var remote2 = function() {
  new Bomb();
}

var loop = function() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle='rgb(0,0,0)';
  ctx.fillRect(0,0,width, height)

  
  bombs.forEach(bomb => {
    bomb.draw();
  });
  player.draw()
  

  if (!pause) {
    requestAnimationFrame(loop);
  }
}

loop();