class Bomb {
  constructor() {
    this.radius = 10,
    this.width =  this.radius,
    this.height = this.radius,
    this.x = width/2;
    this.y = 0;
    this.velX = 0; //getRandomNumber(-50, 50);
    this.velY = 0;
    this.color = 'yellow';
    this.friction = 0.99;
    this.explode = false;
    this.collision = [];
    this.bounce = 10;


    this.explosion();
    bombs.push(this);
  }

  draw() {
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
        bombs.splice(bombs.indexOf(this), 1)
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y+this.radius-10, this.radius, 0, 2 * 3.1415);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * 3.1415);
      ctx.fill();
    }
    
  }

  explosion() {
    setTimeout(() => {
      this.explode = true;
    }, 4000);
  }
}