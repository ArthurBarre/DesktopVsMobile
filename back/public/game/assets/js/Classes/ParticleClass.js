class Particle {
  constructor(radius, x, y, color, type) {
    this.radius = radius
    this.x = x
    this.y = y
    this.color = 'rgb(232,' + getRandomNumber(50, 232) + ',0)'
    switch(type) {
      case 'random' :
        this.velY = getRandomNumber(-5, 5)
        this.velX = getRandomNumber(-5, 5)
    }
    particles.push(this)
    this.lifetime = 60 // in Frames
    this.alive = true
    this.life = 0
  }

  draw() {
    this.life++
    if (this.life === this.lifetime) {
      particles.splice(particles.indexOf(this), 1)
    }
    let opacity = 1 - (this.life/this.lifetime)
    //this.color = 'rgb(232,' + getRandomNumber(50, 232) + ',0)'
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * 3.1415);
    ctx.fill();
    ctx.restore();
    
    this.velX *= 0.99
    this.velY += 0.5
    this.x += this.velX
    this.y += this.velY
  }

}