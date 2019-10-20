class Player {
  constructor() {
    this.width = 50;
    this.height = 80;
    this.x = width/2;
    this.y = height - this.height;
    this.velX = 0;
    this.velY = 0;
    this.color = getRandomRgb();
  }

  draw() {
    if(keys[68]){
        this.velX++;
    }
  
    if(keys[81]){
        this.velX--;
    }
    if(this.y + this.height > height ) {
      this.y = height - this.height;
    }
    if (keys[32]) {
      this.velY = -5;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.velX *= friction;
    this.velY += gravity;
    this.x += this.velX;
    this.y += this.velY;
  }
}