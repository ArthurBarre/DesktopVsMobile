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
  friction = 0.8,
  gravity = 1,
  platform  = new Platform(200,600,500,50);

canvas.width = width;
canvas.height = height;

var engine = function(element) {
  element.velX *= element.friction;
  element.velY += gravity;

  platforms.forEach(platform => {
    if (
      element.x + element.width + element.velX > platform.x &&
      element.x + element.velX < platform.x+platform.width &&
      element.y + element.height + element.velY > platform.y &&
      element.y + element.velY < platform.y+platform.height
    ) {
      if ( element.y + element.height + element.velY >= platform.y && 
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        console.log("top")
        element.velY = 0 + element.bounce;
        element.jump = false;
      }
      if ( element.x + element.width + element.velX > platform.x && element.y + element.width > platform.y) {
        element.velX = 0 + element.bounce;
        console.log("left")
      }
      if ( element.x + element.velX < platform.x + platform.width && element.y + element.width > platform.y) {
        element.velX = 0 + element.bounce;
        console.log("right")
      }
      if ( element.y + element.velY <= platform.y + platform.height && 
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 - element.bounce;
        console.log("bottom")
      }
    }
  });


  element.x += element.velX;
  element.y += element.velY;
}

new Bomb();

var loop = function() {
  ctx.clearRect(0, 0, width, height);

  // BACKGROUND
  ctx.fillStyle='rgb(0,0,0)';
  ctx.fillRect(0,0,width, height)

  bombs.forEach(bomb => {
    bomb.draw();
    engine(bomb);
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