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
    this.jumpPower = 15;
    this.jump = true;
    this.color = 'transparent';
  }

  draw() {
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

    if ( player.y > height + 200) {
      player.y = 0
      player.x = width/2
      player.velY = 0
    }

    engine(player);

    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }
}