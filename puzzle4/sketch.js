const CANVAS_SIZE = 500;
const CENTER_X = CANVAS_SIZE / 2;
const CENTER_Y = CANVAS_SIZE / 2;

const BLACK = [0, 0, 0, 255];
const WHITE = [255, 255, 255, 255];
const FG = [26, 28, 160, 255];
const BG = [71, 82, 245, 255];

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
}

function draw() {
  noStroke();
  strokeWeight(12);
  fill(...BG);
  rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  stroke(...FG);
  noFill();

  const CIRCLES = 3;
  for (let i = 0; i < CIRCLES; i++) {
    const angle = (i + 0.25) * 360 / CIRCLES;
    const x = CENTER_X + 80 * cos(radians(angle));
    const y = CENTER_Y + 80 * sin(radians(angle));
    ellipse(x, y, 250);
  }

  stroke(...WHITE);
  strokeWeight(0);
  fill(...WHITE);

  ellipse(CENTER_X + 75, CENTER_Y - 42, 30, 30);
  ellipse(CENTER_X - 120, CENTER_Y + 70, 30, 30);
  
  stroke(...BLACK);
  fill(...BLACK);
  ellipse(CENTER_X, CENTER_Y - 135, 30, 30);
  ellipse(CENTER_X, CENTER_Y + 85, 30, 30);

  // start
  stroke(...FG);
  strokeWeight(12);
  fill(...FG);
  ellipse(CENTER_X - 124, CENTER_Y - 71, 25)

  // finish
  stroke(...FG);
  strokeWeight(15);
  line(CENTER_X + 124, CENTER_Y - 70, CENTER_X + 155, CENTER_Y - 88)
}
