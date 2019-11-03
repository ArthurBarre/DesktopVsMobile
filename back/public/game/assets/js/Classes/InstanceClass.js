class Instance {
  constructor(map) {
    this.mobs = []
    this.platforms = []
    this.bombs = []
    this.particles = []
    this.gravity = 0.9

    this.player = new Player(this.mobs)
    loadMap(map)
  }

  process() {
    this.mobs.forEach(mob => {
      this.mob(mob)
    })

    this.platforms.forEach(platform => {
      this.platform(platform)
    })

    this.bombs.forEach(bomb => {
      this.bomb(bomb)
    })

    this.particles.forEach(particle => {
      this.particle(particle)
    })
  }

  mob(element) {
    element.process();

    element.velX *= element.friction;
    element.velY += this.gravity;
    let sparksL = false;
    let sparksR = false;
    if (element.velY !== 0) {
      element.jump = true;
    }
    this.platforms.forEach(platform => {
      // TOP COLLISION
      if (
        element.y + element.height + element.velY >= platform.y &&
        element.y < platform.y + platform.height &&
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 + (platform.y - (element.y + element.height))
        element.jump = false;
        // platform.y+= 0.2
      } else if (
        element.y + element.velY <= platform.y + platform.height &&
        element.y > platform.y &&
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 + ((platform.y + platform.height) - element.y);
      }
      // LEFT COLLISION
      if (
        element.x + element.width + element.velX >= platform.x &&
        element.x < platform.x + platform.width &&
        element.y + element.height > platform.y &&
        element.y < platform.y + platform.height
      ) {
        element.velX = 0 + (platform.x - (element.x + element.width));
        if (keys[68]) {
          sparksL = true
        }
      } else if (
        element.x + element.velX <= platform.x + platform.width &&
        element.x + element.width > platform.x &&
        element.y + element.height > platform.y &&
        element.y < platform.y + platform.height
      ) {
        element.velX = 0 + ((platform.x + platform.width) - element.x);
        if (keys[81]) {
          sparksR = true;
        }
      }
    })
    if ((sparksL || sparksR) && element.velY >= 0) {
      counter++;
      if (counter === 4) {
        element.emitSparks();
        counter = 0;x
      }
      element.velY *= 0.80;
      if (keys[32]) {
        if (sparksR) {
          element.velX = 5
          element.velY += -10
        } else {
          element.velX = -5
          element.velY += -10
        }
      }
    }

    element.x += element.velX;
    element.y += element.velY;
  }

  bomb(element) {
    element.process()

    element.velX *= element.friction;
    element.velY += this.gravity;
    this.platforms.forEach(platform => {
      // TOP COLLISION
      if (
        element.y + element.height + element.velY >= platform.y &&
        element.y < platform.y + platform.height &&
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 + (platform.y - (element.y + element.height))
        element.y = platform.y - element.radius;
        element.velY = -element.velY / element.bounce;
      }
      // // BOTTOM COLLISION
      if (
        element.y + element.velY <= platform.y + platform.height &&
        element.y > platform.y &&
        element.x + element.width > platform.x &&
        element.x < platform.x + platform.width
      ) {
        element.velY = 0 + ((platform.y + platform.height) - element.y);
        element.y = platform.y + platform.height + element.radius;
        element.velY = element.velY / element.bounce;
      }
      // LEFT COLLISION
      if (
        element.x + element.width + element.velX >= platform.x &&
        element.x < platform.x + platform.width &&
        element.y + element.height > platform.y &&
        element.y < platform.y + platform.height
      ) {
        element.velX = 0 + (platform.x - (element.x + element.width));
        element.x = platform.x - element.radius;
        element.velX = -element.velX / element.bounce;
      }
      // RIGHT COLLISION
      if (
        element.x + element.velX <= platform.x + platform.width &&
        element.x + element.width > platform.x &&
        element.y + element.height > platform.y &&
        element.y < platform.y + platform.height
      ) {
        element.velX = 0 + ((platform.x + platform.width) - element.x);
        element.x = platform.x + platform.width + element.radius;
        element.velX = -element.velX / element.bounce;
      }
    })

    element.x += element.velX;
    element.y += element.velY;
  }

  platform(element) {
    element.process()
  }

  particle(element) {
    element.process()
  }
}