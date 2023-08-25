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

  const CIRCLES = 6;
  for (let i = 0; i < CIRCLES; i++) {
    const angle = i * 360 / CIRCLES;
    const x = CENTER_X + 85 * cos(radians(angle));
    const y = CENTER_Y + 85 * sin(radians(angle));
    // ellipse(x, y, 280);
    arc(x, y, 250, 250, radians(angle - 170), radians(angle + 170));
  }

  // stroke(...WHITE);
  // strokeWeight(0);
  // fill(...WHITE);

  // ellipse(CENTER_X + 125, CENTER_Y + 125, 25, 25);
  // ellipse(CENTER_X + 125, CENTER_Y - 125, 25, 25);
  // ellipse(CENTER_X - 125, CENTER_Y - 125, 25, 25);
  // ellipse(CENTER_X - 50, CENTER_Y + 50, 25, 25);
  
  // stroke(...BLACK);
  // fill(...BLACK);
  // ellipse(CENTER_X + 50, CENTER_Y + 50, 25, 25);
  // ellipse(CENTER_X + 50, CENTER_Y - 50, 25, 25);
  // ellipse(CENTER_X - 120, CENTER_Y, 25, 25);

  // // start
  // stroke(...FG);
  // fill(...FG);
  // ellipse(CENTER_X, CENTER_Y - 188, 30)

  // // finish
  // stroke(...FG);
  // strokeWeight(12);
  // line(CENTER_X, CENTER_Y + 188, CENTER_X, CENTER_Y + 210)
}
