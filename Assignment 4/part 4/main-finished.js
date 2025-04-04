// Select the paragraph element to display ball count
const para = document.querySelector('p');
let count = 0; // Number of active balls

// Get canvas and 2D drawing context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window size
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Function to generate a random number between min and max
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// Function to generate a random RGB color string
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Base class for shared properties (used by Ball and EvilCircle)
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class inherits from Shape
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true; // Tracks if the ball is still active
  }

  // Draw the ball on the canvas
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Update the ball's position and bounce off edges
  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }

    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // Change color when colliding with another ball
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class - controlled by user, eats balls on contact
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); // Fast velocity for responsiveness
    this.color = "white";
    this.size = 10;

    // Add keyboard controls for movement
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a': this.x -= this.velX; break; // Left
        case 'd': this.x += this.velX; break; // Right
        case 'w': this.y -= this.velY; break; // Up
        case 's': this.y += this.velY; break; // Down
      }
    });
  }

  // Draw the EvilCircle as an outlined circle
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Keep EvilCircle within the canvas boundaries
  checkBounds() {
    if ((this.x + this.size) >= width) this.x -= this.size;
    if ((this.x - this.size) <= 0) this.x += this.size;
    if ((this.y + this.size) >= height) this.y -= this.size;
    if ((this.y - this.size) <= 0) this.y += this.size;
  }

  // Detect collision with balls and remove them
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false; // Remove ball
          count--;             // Update count
          para.textContent = 'Ball count: ' + count;
        }
      }
    }
  }
}

// Create array of balls
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size), // X position
    random(0 + size, height - size), // Y position
    random(-7, 7), // X velocity
    random(-7, 7), // Y velocity
    randomRGB(),   // Color
    size           // Size
  );
  balls.push(ball);
  count++;
  para.textContent = 'Ball count: ' + count;
}

// Create EvilCircle at random position
const evilBall = new EvilCircle(random(0, width), random(0, height));

// Animation loop to keep everything moving
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // Transparent background
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  requestAnimationFrame(loop); // Keep looping
}

loop(); // Start the animation