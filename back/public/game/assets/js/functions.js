// -- Keys listener for loop --
// Gives each down in keys[]
// Removes key when it is up
document.body.addEventListener("keydown", function(event){
  keys[event.keyCode] = true;
});
document.body.addEventListener("keyup", function(event){
	keys[event.keyCode] = false;
});

// -- Pause listener --
document.body.addEventListener('keyup', function(e){
  if (!pause) {
    if(e.keyCode == 80){
      pause = true;
  }
  } else {
    if(e.keyCode == 80){
      pause = false;
      loop();
    }
  }
});

// Return obj center point X and Y
var getCenterX = function(obj) {
  if (obj.width) {
    centerX = obj.x+(obj.width/2);
  } else {
    centerX = obj.x
  }
  return centerX;
}
var getCenterY = function(obj) {
  if (obj.height) {
    centerY = obj.y+(obj.height/2);
  } else {
    centerY = obj.y
  }
  return centerY;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRgb() {
  return 'rgb(' + getRandomNumber(0, 255) + ',' + getRandomNumber(0, 255) + ',' + getRandomNumber(0, 255) + ')';
}