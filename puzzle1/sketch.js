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
  strokeWeight(10);
  fill(...BG);
  rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  stroke(...FG);
  noFill();

  const CIRCLES = 4;
  for (let i = 0; i < CIRCLES; i++) {
    const angle = (i + 0.5) * 360 / CIRCLES;
    const x = CENTER_X + 60 * cos(radians(angle));
    const y = CENTER_Y + 60 * sin(radians(angle));
    ellipse(x, y, 300);
  }

  stroke(...WHITE);
  fill(...WHITE);

  ellipse(CENTER_X + 125, CENTER_Y + 125, 15, 15);
  ellipse(CENTER_X + 125, CENTER_Y - 125, 15, 15);
  ellipse(CENTER_X - 125, CENTER_Y - 125, 15, 15);
  ellipse(CENTER_X - 79, CENTER_Y + 79, 15, 15);
  
  stroke(...BLACK);
  fill(...BLACK);
  ellipse(CENTER_X + 79, CENTER_Y + 79, 15, 15);
  ellipse(CENTER_X + 79, CENTER_Y - 79, 15, 15);
  ellipse(CENTER_X - 138, CENTER_Y, 15, 15);

  // start
  stroke(...FG);
  fill(...FG);
  ellipse(CENTER_X, CENTER_Y - 185, 15)

  // finish
  stroke(...FG);
  strokeWeight(15);
  line(CENTER_X, CENTER_Y + 188, CENTER_X, CENTER_Y + 210)
}
