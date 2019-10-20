class Player {
  constructor() {
    this.width = 50;
    this.height = 80;
    this.x = width/2;
    this.y = height - this.height;
    this.velX = 0;
    this.velY = 0;
    this.color = getRandomRgb();
    this.life = 100;
    this.flying = false,
    this.friction = 0.9,
    this.gravity = 0.7;
    this.speed = 2;
  }

  draw() {
    if(keys[68]){
        this.velX += this.speed;
    }
  
    if(keys[81]){
        this.velX -= this.speed;
    }
    if(this.y + this.height > height ) {
      this.y = height - this.height;
      this.flying = false;
    }
    if (keys[32] && !this.flying) {
      this.flying = true;
      this.velY = -20;
    }
    // ctx.fillStyle = this.color;
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
    

    this.velX *= this.friction;
    this.velY += this.gravity;
    this.x += this.velX;
    this.y += this.velY;
  }
}