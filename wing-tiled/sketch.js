const CANVAS_SIZE = 500;
const CENTER_X = CANVAS_SIZE / 2;
const CENTER_Y = CANVAS_SIZE / 2;

const WHITE = [255, 255, 255, 255];
const BLACK = [0, 0, 0, 255];
const WING_DARKER_GREEN = [26, 54, 51, 255];
const WING_DARK_GREEN = [68, 137, 126, 255];
const WING_LIGHT_GREEN = [103, 210, 193, 255];
const WING_YELLOW = [247, 198, 75, 255];
const WING_PINK = [201, 70, 156, 255];

const FRAME_RATE = 30;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  frameRate(FRAME_RATE);
}

let l1 = 0;
let l2 = 0;

let stopped = false;

// from https://math.stackexchange.com/questions/2981683/how-to-adjust-the-curve-of-a-sine-wave-formula
function makeCurvy(t) {
  const a = 0.3;
  return t / (1 - a + a * abs(t));
}

function draw() {
  fill(...WHITE);
  rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  strokeWeight(1);

  function drawWingLine(startX, startY, width, height, repeat = 10) {
    function drawHalfWing(startX, startY, width, height) {
      const STEPS = 80;
      for (let i = 0; i < STEPS; i++) {
        let x = lerp(0, width, i / STEPS);
        let y = makeCurvy(sin(lerp(-0.5 * PI, 1.5 * PI, i / STEPS))) * height / 2 + (height / 2);
        point(startX + x, startY + y);
      }
    }

    for (let i = 0; i < repeat; i++) {
      drawHalfWing(startX + width * i, startY, width * 0.7, height);
      line(startX + width * (i + 0.70), startY, startX + (1 + i) * width, startY);
    }
  }

  if (!stopped) {
    l1 += deltaTime / 5;
    if (l1 > 0) {
      l1 -= 200;
    }
  
    l2 -= deltaTime / 5;
    if (l2 < -200) {
      l2 += 200;
    }
  }

  stroke(...BLACK);
  strokeWeight(15);
  drawWingLine(l1, -50, 200, 100);
  drawWingLine(l2, -50, 200, 100);
  drawWingLine(l1 - 100, 65, 200, 100);
  drawWingLine(l2 - 100, 65, 200, 100);
  drawWingLine(l1, 180, 200, 100);
  drawWingLine(l2, 180, 200, 100);
  drawWingLine(l1 - 100, 295, 200, 100);
  drawWingLine(l2 - 100, 295, 200, 100);
  drawWingLine(l1, 410, 200, 100);
  drawWingLine(l2, 410, 200, 100);
  noFill();
}

function keyPressed() {
  if (key === ' ') {
    stopped = !stopped;
  }
}
