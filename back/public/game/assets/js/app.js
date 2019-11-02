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
  particles=[],
  width = 1200,
  height = 800,
  player = new Player(),
  gravity = 1;

// new Platform(0,0,50,height)
// new Platform(1150,0,50,height)
// new Platform(100,700,1000,50)
new Bomb()

function loadJSON() {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'assets/maps/map1572619213430.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          platformss = JSON.parse(xobj.responseText)
          platformss.forEach(element => {
            let x =  element.x;
            let y = element.y;
            let width = element.width;
            let height = element.height;
            new Platform(x, y, width, height)
          });
        }
  };
  xobj.send(null);  
}

loadJSON()

canvas.width = width;
canvas.height = height;

var counter = 0;

var engine = function(element) {
  element.velX *= element.friction;
  element.velY += gravity;
  let sparksL = false;
  let sparksR = false;

  if (element.bounce) {
    platforms.forEach(platform => {
      // TOP COLLISION
      if ( 
        element.y + element.height + element.velY >= platform.y && 
        element.y < platform.y + platform.height &&
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 + ( platform.y - (element.y + element.height) )
        element.y = platform.y - element.radius;
        element.velY = -element.velY/element.bounce;
      }
      // // BOTTOM COLLISION
      if ( 
        element.y + element.velY <= platform.y + platform.height && 
        element.y > platform.y &&
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 + ( (platform.y + platform.height) - element.y);
        element.y = platform.y + platform.height + element.radius;
        element.velY = element.velY/element.bounce;
      }
      // LEFT COLLISION
      if ( 
        element.x + element.width + element.velX >= platform.x && 
        element.x < platform.x + platform.width &&
        element.y + element.height > platform.y && 
        element.y < platform.y + platform.height
      ) {
        element.velX = 0 + ( platform.x - ( element.x + element.width ) );
        element.x = platform.x - element.radius;
        element.velX = -element.velX/element.bounce;
      }
      // RIGHT COLLISION
      if ( 
        element.x + element.velX <= platform.x + platform.width && 
        element.x + element.width > platform.x &&
        element.y + element.height > platform.y &&
        element.y < platform.y + platform.height
      ) {
        element.velX = 0 + ( (platform.x + platform.width) - element.x);
        element.x = platform.x + platform.width + element.radius;
        element.velX = -element.velX/element.bounce;
      }
    });
  } else if (element == player) {
    if (element.velY !== 0) {
      element.jump = true;
    }
    platforms.forEach(platform => {
      // TOP COLLISION
      if ( 
        element.y + element.height + element.velY >= platform.y && 
        element.y < platform.y + platform.height &&
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 + ( platform.y - (element.y + element.height) )
        element.jump = false;
      }
      // // BOTTOM COLLISION
      if ( 
        element.y + element.velY <= platform.y + platform.height && 
        element.y > platform.y &&
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 + ( (platform.y + platform.height) - element.y);
      }
      // LEFT COLLISION
      if ( 
        element.x + element.width + element.velX >= platform.x && 
        element.x < platform.x + platform.width &&
        element.y + element.height > platform.y && 
        element.y < platform.y + platform.height
      ) {
        element.velX = 0 + ( platform.x - ( element.x + element.width ) );
        if ( keys[68] ){
          sparksL = true
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
        if ( keys[81] ) {
          sparksR = true;
        }

      }
    });
  }

  if ((sparksL || sparksR ) && element.velY >= 0 && element == player) {
    counter++;
    console.log(counter)
    if (counter === 4) {
      element.emitSparks();
      counter  = 0;
    }
    element.velY *= 0.80;
    element.jump = false;
    if ( keys[32] ) {
      if ( sparksR ) {
        element.velX = -10
      } else {
        element.velX = 10
      }
    }
  }

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
  platforms.forEach(platform => {
    platform.draw()
  });
  particles.forEach(particle => {
    particle.draw()
  });

  player.draw();
  

  if (!pause) {
    requestAnimationFrame(loop);
  }
}

loop();