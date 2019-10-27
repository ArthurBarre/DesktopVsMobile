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
  gravity = 1;

new Platform(0,0,50,height)
new Platform(1150,0,50,height)
new Platform(100,700,1000,50)
new Bomb()

canvas.width = width;
canvas.height = height;

var engine = function(element) {
  element.velX *= element.friction;
  element.velY += gravity;

  platforms.forEach(platform => {
    // TOP COLLISION
    if ( 
      element.y + element.height + element.velY >= platform.y && 
      element.y < platform.y + platform.height &&
      element.x + element.width > platform.x &&
      element.x < platform.x + platform.width
    ) {
      element.velY = 0 + ( platform.y - (element.y + element.height) )
      if (element.jump) {
        element.jump = false;
      }
      if (element.bounce)  {
        element.y = platform.y - element.radius;
        element.velY = -element.velY/element.bounce;
      }
    }
    // // BOTTOM COLLISION
    if ( 
      element.y + element.velY <= platform.y + platform.height && 
      element.y > platform.y &&
      element.x + element.width > platform.x &&
      element.x < platform.x + platform.width
    ) {
      element.velY = 0 + ( (platform.y + platform.height) - element.y);
      if (element.bounce)  {
        element.y = platform.y + platform.height + element.radius;
        element.velY = element.velY/element.bounce;
      }
    }
    // LEFT COLLISION
    if ( 
      element.x + element.width + element.velX >= platform.x && 
      element.x < platform.x + platform.width &&
      element.y + element.height > platform.y && 
      element.y < platform.y + platform.height
    ) {
      element.velX = 0 + ( platform.x - ( element.x + element.width ) );
      if (element.bounce)  {
        element.x = platform.x - element.radius;
        element.velX = -element.velX/element.bounce;
      }
    }
    // RIGHT COLLISION
    if ( 
      element.x + element.velX <= platform.x + platform.width && 
      element.x + element.width > platform.x &&
      element.y + element.height > platform.y &&
      element.y < platform.y + platform.height
    ) {
      element.velX = 0 + ( (platform.x + platform.width) - element.x);
      if (element.bounce)  {
        element.x = platform.x + platform.width + element.radius;
        element.velX = -element.velX/element.bounce;
      }
    }
  });

  element.x += element.velX;
  element.y += element.velY;
}

var loop = function() {
  ctx.clearRect(0, 0, width, height);

  // BACKGROUND
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