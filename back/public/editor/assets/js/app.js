var io = io.connect();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var 
  keys = [],
  platforms = [],
  width = 1200,
  height = 800;

// new Platform(0,0,50,height)
// new Platform(1150,0,50,height)
// new Platform(100,700,1000,50)

canvas.width = width;
canvas.height = height;

var mouseX, mouseY

// document.body.onmousemove = event => {
//   mouseX = event.clientX
//   mouseY = event.clientY
// }

var click = false;
var pointX, pointY;
var pointX2, pointY2;

document.querySelector('button').addEventListener('click', () => {
  let json = JSON.stringify(platforms)
  io.emit('json', json)
})


document.querySelector('main').addEventListener('click', (event) => {
  if (click) {
    click = false;
    pointX2 = event.clientX;
    pointY2 = event.clientY -50;
    let platX, platY, platWidth, platHeight
    if ( pointX > pointX2 ) {
      platX = pointX2;
      platWidth = pointX - pointX2
    } else {
      platX = pointX;
      platWidth = pointX2 - pointX
    }
    if ( pointY > pointY2 ) {
      platY = pointY2;
      platHeight = pointY - pointY2
    } else {
      platY = pointY;
      platHeight= pointY2 - pointY
    }

    new Platform( platX, platY, platWidth, platHeight);
    console.log(platforms)
  } else {
    click = true;
    pointX = event.clientX;
    pointY = event.clientY - 50;
  }
})

var loop = function() {
  ctx.clearRect(0, 0, width, height);
  // BACKGROUND
  

  ctx.fillStyle='rgb(0,0,0)';
  ctx.fillRect(0,0,width, height)

  platforms.forEach(platform=>{
    platform.draw()
  });

  requestAnimationFrame(loop);
}

loop();