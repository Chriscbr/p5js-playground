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
  strokeWeight(15);
  fill(...BG);
  rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  stroke(...FG);
  noFill();

  const CIRCLES = 2;
  for (let i = 0; i < CIRCLES; i++) {
    const angle = i * 360 / CIRCLES;
    const x = CENTER_X + 70 * cos(radians(angle));
    const y = CENTER_Y + 70 * sin(radians(angle));
    ellipse(x, y, 280);
  }

  stroke(...WHITE);
  strokeWeight(0);
  fill(...WHITE);

  ellipse(CENTER_X + 140, CENTER_Y, 30, 30);
  ellipse(CENTER_X, CENTER_Y, 30, 30);
  
  stroke(...BLACK);
  fill(...BLACK);
  ellipse(CENTER_X - 140, CENTER_Y, 30, 30);

  // start
  stroke(...FG);
  strokeWeight(15);
  fill(...FG);
  ellipse(CENTER_X, CENTER_Y - 120, 25)

  // finish
  stroke(...FG);
  strokeWeight(18);
  line(CENTER_X, CENTER_Y + 128, CENTER_X, CENTER_Y + 158)
}
