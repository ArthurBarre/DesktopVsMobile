//import { runInThisContext } from "vm";

class Player {
  constructor() {
    this.width = 30;
    this.height = 40;
    this.x = width/2;
    this.y = 100;
    this.velX = 0;
    this.velY = 0;
    this.friction = 0.8;
    this.speed = 2;
    this.jumpPower = 25;
    this.collision = [];
    this.jump = true;
    this.color = 'transparent';
    this.bounce = 0;
  }

  draw() {
    if ( this.y + this.height >= height ) {
      this.y = height-this.height;
      this.velY = 0;
      this.jump = false;
    }

      /**
    * CONTROLS
    */
    if ( keys[68] ) {
      // GO RIGHT
      this.velX += this.speed;
    }
    if ( keys[81] ) {
      //GO LEFT
      this.velX -= this.speed;
    }
    if ( keys[32] && !this.jump ) {
      // JUMP
      this.jump = true;
      this.velY = -this.jumpPower;
    }

    engine(player);

    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }
}