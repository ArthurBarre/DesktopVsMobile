class Bomb {
  constructor() {
    this.radius = 10,
    this.width =  this.radius,
    this.height = this.radius,
    this.x = width/2;
    this.y = 0;
    this.velX = getRandomNumber(-50, 50);
    this.velY = 0;
    this.color = 'yellow';
    this.friction = 0.99;
    this.explode = false;
    this.bounce = 2;
    this.explosion();
    instance.bombs.push(this);
  }

  draw() {
    ctx.fillStyle = this.color;
    if (this.explode) {
      if (this.radius < 100) {
        this.radius += 3;
        ctx.fillStyle = 'rgba(255,255,0,'+ (100-this.radius)/100 +')'
      }  else {
        instance.bombs.splice(instance.bombs.indexOf(this), 1)
      }
      if (instance.player.x > this.x - this.radius && instance.player.x < this.x + this.radius && instance.player.y > this.y - this.radius && instance.player.y < this.y +  this.radius) {
        instance.player.life -= 0.5
      }
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * 3.1415);
    ctx.fill();
  }

  explosion() {
    setTimeout(() => {
      this.explode = true;
    }, 4000);
  }

  process() {
    this.draw()
  }
}