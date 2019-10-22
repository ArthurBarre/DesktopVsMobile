//import { runInThisContext } from "vm";

class Player {
  constructor() {
    this.width = 30;
    this.height = 40;
    this.x = width/2;
    this.y = 100;
    this.velX = 0;
    this.velY = 0;
    this.color = getRandomRgb();
    this.life = 100;
    this.friction = 0.9;
    this.gravity = 0.7;
    this.speed = 1.5;
    this.jumpPower = 20;
  }

  draw() {
    this.velX *= this.friction;
    this.velY += this.gravity;

    if ( this.y + this.height >= height ) {
      this.y = height-this.height;
      this.velY = 0;
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
    if ( keys[32] && this.velY == 0 ) {
      // JUMP
      this.velY = -this.jumpPower;
    }

    // platforms.forEach(platform => {
    //   if (this.x + this.width >= platform.x && this.y + this.width < ) {
    //     this.velX = 0;
    //   }
    // });

    this.x += this.velX;
    this.y += this.velY;

    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }
}