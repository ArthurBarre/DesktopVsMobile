var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var socket = io.connect();

socket.on('buttonUpdate', function(){
  player.color = getRandomRgb()
});
socket.on('newBomb', function(){
  for (i=0;i<10;i++){
    new Bomb();
  }

});

var 
  keys = [],
  pause= false,
  bombs = [],
  width = window.innerWidth,
  height = window.innerHeight,
  player = new Player(),
  friction = 0.9,
  gravity = 0.4,
  bomb = new Bomb();


canvas.width = width;
canvas.height = height;

var remote1 = function() {
  player.color = getRandomRgb();
}

var remote2 = function() {

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