var io = io.connect();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var 
  keys = [],
  platforms = [],
  width = 1216,
  height = 800;

canvas.width = width;
canvas.height = height;

var mouseX, mouseY

var click = false;
var pointX, pointY;
var pointX2, pointY2;

document.querySelector('.save').addEventListener('click', () => {
  let json = JSON.stringify(platforms)
  io.emit('json', json)
})

document.querySelector('.clear').addEventListener('click', () => {
  platforms = []
  background()
})

document.querySelector('.undo').addEventListener('click', () => {
  platforms.pop()
  background()
})

// BACKGROUND
var background = function(value) {
  ctx.clearRect(0,0,width,height)
  ctx.fillStyle='rgb(0,0,0)';
  ctx.fillRect(0,0,width, height)

  for (let x = 0; x <= width/32; x++) {
    for (let y = 0; y <= height/32; y++) {
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.beginPath()
      ctx.arc(x*32, y*32, 2, 0, 2 * 3.1415)
      ctx.fill();
    }
  }
}

document.querySelector('main').addEventListener('click', (event) => {
  if (click) {
    click = false;
    pointX2 = Math.round(event.clientX/32)*32
    pointY2 = (Math.round(event.clientY/32)*32) - 32
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

    if (platWidth > 0 && platHeight > 0 )  {
      new Platform( platX, platY, platWidth, platHeight);
      console.log(platforms)
    }
  } else {
    click = true;
    pointX = Math.round(event.clientX/32)*32
    pointY = (Math.round(event.clientY/32)*32) - 32
  }
})

background()
var loop = function() {

  platforms.forEach(platform=>{
    platform.draw()
  });

  requestAnimationFrame(loop);
}

loop();