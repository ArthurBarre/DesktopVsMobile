class Bomb {
  constructor() {
    this.radius = 10,
    this.x = width/2;
    this.y = 0;
    this.velX = getRandomNumber(-50, 50);
    this.velY = 0;
    this.color = 'yellow';
    this.gravity = 0.4;
    this.friction = 0.99;
    this.explode = false;
    this.render = true;
    this.explosion();
    bombs.push(this);
  }

  draw() {
    if (this.render) {
      if(this.y + this.radius > height ) {
        this.y = height - this.radius;
        this.velY = -this.velY / 2
      }
  
      if (this.x < 0) {
        this.x = 0;
        this.velX = -this.velX/2
      }
      if (this.x + this.radius > width) {
        this.x = width-this.radius;
        this.velX = -this.velX/2
      }
      ctx.fillStyle = this.color;
      if (this.explode) {
        if (this.radius < 100) {
          this.radius += 3;
          ctx.fillStyle = 'rgba(255,255,0,'+ (100-this.radius)/100 +')'
        }  else {
          this.render = false;
        }
      }
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * 3.1415);
      ctx.fill();
  
  
  
      this.velX *= this.friction;
      this.velY += this.gravity;
      this.x += this.velX;
      this.y += this.velY;
    }

  }

  explosion() {
    setTimeout(() => {
      this.explode = true;
    }, 4000);
  }
}