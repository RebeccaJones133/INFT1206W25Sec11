// Select the canvas element from the DOM and get its 2D drawing context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas width and height to fill the entire browser window
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Function to generate a random number between `min` and `max`
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// Function to generate a random RGB color string
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball class to represent each ball on the canvas
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;             // X position
    this.y = y;             // Y position
    this.velX = velX;       // Velocity in X direction
    this.velY = velY;       // Velocity in Y direction
    this.color = color;     // Ball color
    this.size = size;       // Ball radius
  }

  // Draw the ball on the canvas
  draw() {
    ctx.beginPath();               // Start a new path
    ctx.fillStyle = this.color;   // Set fill color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw circle
    ctx.fill();                   // Fill the circle
  }

  // Update the ball's position and bounce off edges
  update() {
    // Reverse X velocity if it hits the horizontal walls
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    // Reverse Y velocity if it hits the vertical walls
    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    // Move the ball by adding velocity to position
    this.x += this.velX;
    this.y += this.velY;
  }

  // Detect collision with other balls and change color if they touch
  collisionDetect() {
    for (const ball of balls) {
      // Make sure it's not the same ball
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the balls overlap, change their colors
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Create an array to hold all balls
const balls = [];

// Generate 10 random balls and add them to the array
while (balls.length < 10) {
  const size = random(10, 20); // Radius between 10 and 20

  const ball = new Ball(
    // Random position within canvas boundaries (avoiding edges)
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),     // Random X velocity
    random(-7, 7),     // Random Y velocity
    randomRGB(),       // Random color
    size
  );

  balls.push(ball); // Add the ball to the array
}

// Animation loop to keep the balls moving
function loop() {
  // Semi-transparent black background to create trailing effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  // For each ball, draw it, update its position, and check for collisions
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  // Request the next animation frame
  requestAnimationFrame(loop);
}

// Start the animation loop
loop();