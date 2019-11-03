// CANVAS SETUP
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = 1200
var height = 800
canvas.width = width
canvas.height = height

// IMAGES IMPORTS
var playerImg = new Image()
playerImg.src = "assets/imgs/player.png"
var socket = io.connect()

// REMOTE ACTIONS
socket.on('buttonUpdate', function () {
  player.color = getRandomRgb()
});
socket.on('newBomb', function () {
  new Bomb()
});


var counter = 0;

var instance = new Instance('map1572730340905')
// var player = new Player()

var loop = function () {
  ctx.clearRect(0, 0, width / 2, height)

  // BACKGROUND
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, width, height);

  ctx.font = "30px Arial";
  ctx.fillStyle = 'white'
  ctx.fillText(Math.round(instance.player.life * 10) / 10, 100, 50);

  instance.process();

  if (!pause) {
    requestAnimationFrame(loop);
  }
}

loop();