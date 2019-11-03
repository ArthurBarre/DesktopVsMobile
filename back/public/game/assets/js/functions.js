// -- Keys listener for loop --
// Gives each down in keys[]
// Removes key when it is up
var keys = []
document.body.addEventListener("keydown", function(event){
  keys[event.keyCode] = true;
});
document.body.addEventListener("keyup", function(event){
	keys[event.keyCode] = false;
});

// -- Pause listener --
var pause= false
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

// Randomers
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomRgb() {
  return 'rgb(' + getRandomNumber(0, 255) + ',' + getRandomNumber(0, 255) + ',' + getRandomNumber(0, 255) + ')';
}

// MAP LOADING
function loadMap(map) {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'assets/maps/' + map + '.json', true); // Replace 'my_data' with the path to your file
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
