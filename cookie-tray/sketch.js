const CANVAS_SIZE = 500;
const CENTER_X = CANVAS_SIZE / 2;
const CENTER_Y = CANVAS_SIZE / 2;

const TRAY_CENTER_X = CENTER_X;
const TRAY_CENTER_Y = CENTER_Y;
const TRAY_WIDTH = 400;
const TRAY_HEIGHT = 250;
const TRAY_CORNER_RADIUS = 20;
const TRAY_TOP_LEFT_X = TRAY_CENTER_X - TRAY_WIDTH / 2;
const TRAY_TOP_LEFT_Y = TRAY_CENTER_Y - TRAY_HEIGHT / 2;

const BLACK = [0, 0, 0, 255];
const BEIGE = [245, 245, 220, 255];
const WHITE = [255, 255, 255, 255];
const DARK_GRAY = [100, 100, 100, 255];
const MEDIUM_GRAY = [150, 150, 150, 255];
const COOKIE_BROWN = [180, 110, 60, 255];

const COOKIE_SIZE = 50;
const COOKIE_COUNT = 20;

// Cookie coordinates will range from 0 to TRAY_WIDTH and TRAY_HEIGHT
let cookiePositions = [];
for (let i = 0; i < COOKIE_COUNT; i++) {
  cookiePositions.push({
    x: Math.random() * TRAY_WIDTH,
    y: Math.random() * TRAY_HEIGHT,
  });
}

let startTime;
let temperature;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  frameRate(60);
  reset();
}

function keyPressed() {
  if (key === 'r') {
    reset();
  }
}

function reset() {
  cookiePositions.length = 0;
  for (let i = 0; i < COOKIE_COUNT; i++) {
    cookiePositions.push({
      x: Math.random() * TRAY_WIDTH,
      y: Math.random() * TRAY_HEIGHT,
    });
  }
  startTime = millis();
}

function draw() {
  let elapsed = millis() - startTime;
  temperature = 2000 / (elapsed + 1000);

  // Outline the canvas
  noStroke();
  strokeWeight(10);
  fill(...BEIGE);
  rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Draw the tray
  noStroke();
  fill(...DARK_GRAY);
  rect(
    TRAY_CENTER_X - TRAY_WIDTH / 2 - 30,
    TRAY_CENTER_Y - TRAY_HEIGHT / 2 - 30,
    TRAY_WIDTH + 60,
    TRAY_HEIGHT + 60,
    TRAY_CORNER_RADIUS,
    TRAY_CORNER_RADIUS,
    TRAY_CORNER_RADIUS,
    TRAY_CORNER_RADIUS
  );

  // Draw the inner tray
  noStroke();
  fill(...MEDIUM_GRAY);
  rect(
    TRAY_CENTER_X - TRAY_WIDTH / 2 - 20,
    TRAY_CENTER_Y - TRAY_HEIGHT / 2 - 20,
    TRAY_WIDTH + 40,
    TRAY_HEIGHT + 40,
    TRAY_CORNER_RADIUS / 2,
    TRAY_CORNER_RADIUS / 2,
    TRAY_CORNER_RADIUS / 2,
    TRAY_CORNER_RADIUS / 2
  );

  // Draw the cookies
  for (let i = 0; i < cookiePositions.length; i++) {
    let cookie = cookiePositions[i];
    let OFFSET_X = TRAY_TOP_LEFT_X;
    let OFFSET_Y = TRAY_TOP_LEFT_Y
    fill(...COOKIE_BROWN);
    ellipse(cookie.x + OFFSET_X, cookie.y + OFFSET_Y, COOKIE_SIZE, COOKIE_SIZE);
  }

  // Update the cookie positions to be less close to each other
  // For each cookie, calculate the distance to all other cookies
  // Identify the closest cookie and move the current cookie away from it
  for (let i = 0; i < cookiePositions.length; i++) {
    let cookie = cookiePositions[i];
    let closestDistance = Infinity;
    let closestCookie = null;
    for (let j = 0; j < cookiePositions.length; j++) {
      if (i !== j) {
        let distance = Math.sqrt(Math.pow(cookie.x - cookiePositions[j].x, 2) + Math.pow(cookie.y - cookiePositions[j].y, 2));
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCookie = cookiePositions[j];
        }
      }
    }

    if (closestCookie) {
      let distance = Math.sqrt(Math.pow(cookie.x - closestCookie.x, 2) + Math.pow(cookie.y - closestCookie.y, 2));
      cookie.x += (cookie.x - closestCookie.x) / distance * temperature;
      cookie.y += (cookie.y - closestCookie.y) / distance * temperature;
    }

    // Move the cookie away from the tray edges
    if (cookie.x < 20) {
      cookie.x += 0.001 * ((cookie.x - 20) ** 4)
    }
    if (cookie.x > TRAY_WIDTH - 20) {
      cookie.x -= 0.001 * ((TRAY_WIDTH - 20 - cookie.x) ** 4)
    }
    if (cookie.y < 20) {
      cookie.y += 0.001 * ((cookie.y - 20) ** 4)
    }
    if (cookie.y > TRAY_HEIGHT - 20) {
      cookie.y -= 0.001 * ((TRAY_HEIGHT - 20 - cookie.y) ** 4)
    }
  }
}
