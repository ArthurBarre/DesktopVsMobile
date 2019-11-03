class Player {
  constructor(mobsArray) {
    this.width = 30
    this.height = 40
    this.x = width/2
    this.y = 700
    this.velX = 0
    this.velY = 0
    this.friction = 0.8
    this.speed = 1.5

    this.jumpPower = 15
    this.jump = true
    this.color = 'transparent'

    this.keyRight = 68
    this.keyLeft = 81
    this.keyJump = 32

    mobsArray.push(this)

    this.life = 100
  }

  controls() {
    if ( keys[this.keyRight] ) {
      // GO RIGHT
      this.velX += this.speed
    }
    if ( keys[this.keyLeft] ) {
      //GO LEFT
      this.velX -= this.speed
    }
    if ( keys[this.keyJump] && !this.jump ) {
      // JUMP
      this.jump = true
      this.velY = -this.jumpPower
    }

    // AUTO RESPAWN IF FALLING
    if ( this.y > height + 200) {
      this.y = 100
      this.x = width/2
      this.velY = 0
    }
  }

  draw() {
    // ctx.fillStyle = this.color
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }

  emitSparks() {
    new Particle(3, getRandomNumber(this.x, this.x+this.width), this.y+this.height, "white", "random")
  }

  process() {
    this.controls()
    this.draw()
  }
}