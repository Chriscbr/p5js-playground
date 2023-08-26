const CANVAS_SIZE = 500;
const CENTER_X = CANVAS_SIZE / 2;
const CENTER_Y = CANVAS_SIZE / 2;

const BLACK = [0, 0, 0, 255];

const blobObj = [];
const pts = 20;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  // noLoop();

  let r = 100;
  for (let i = 0; i < pts; i++) {
    r += random(-10, 10);
    r = r * 0.9 + 100 * 0.1;
    const dr = random(-10, 10);
    blobObj.push({ r, dr, x: r * cos(i * TWO_PI / pts), y: r * sin(i * TWO_PI / pts) });
  }
}

// from https://math.stackexchange.com/questions/2981683/how-to-adjust-the-curve-of-a-sine-wave-formula
function makeCurvy(t) {
  const a = 0.3;
  return t / (1 - a + a * abs(t));
}

function draw() {
  rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  strokeWeight(1);
  beginShape();

  for (let i = 0; i < pts; i++) {
    let dr = blobObj[i].dr;
    dr += random(-1, 1);
    dr = dr * 0.9 + 0 * 0.1;
    let r = blobObj[i].r;
    r += dr;
    r = r * 0.9 + 100 * 0.1;
    // interpolate with previous and next point's r
    blobObj[i].r = r;
    blobObj[i].dr = dr;
    blobObj[i].x = r * cos(i * TWO_PI / pts);
    blobObj[i].y = r * sin(i * TWO_PI / pts);
  }

  // text(`p0: ${blobObj[0].x.toFixed(2)}, ${blobObj[0].y.toFixed(2)}`, 10, 20);
  // text(`p0.r: ${blobObj[0].r.toFixed(2)}`, 10, 40);
  // text(`p0.dr: ${blobObj[0].dr.toFixed(2)}`, 10, 60);

  for (let i = 0; i < pts; i++) {
    curveVertex(CENTER_X + blobObj[i].x, CENTER_Y + blobObj[i].y);
  }
  curveVertex(CENTER_X + blobObj[0].x, CENTER_Y + blobObj[0].y);
  curveVertex(CENTER_X + blobObj[1].x, CENTER_Y + blobObj[1].y);
  curveVertex(CENTER_X + blobObj[2].x, CENTER_Y + blobObj[2].y);
  endShape();

  strokeWeight(15);
  strokeCap(SQUARE);
  stroke(...BLACK);

  function drawHalfWing(start_x, start_y, width, height) {
    const STEPS = 200;
    for (let i = 5; i < STEPS - 5; i++) {
      let x = lerp(0, width, i / STEPS);
      let y = makeCurvy(sin(lerp(-0.5 * PI, 1.5 * PI, i / STEPS))) * height / 2 + (height / 2);
      point(start_x + x, start_y + y);
    }
  }

  drawHalfWing(CENTER_X - 95, CENTER_Y - 50, 140, 100);
  drawHalfWing(CENTER_X - 45, CENTER_Y - 50, 140, 100);

  line(CENTER_X - 100, CENTER_Y - 50, CENTER_X - 40, CENTER_Y - 50);
  line(CENTER_X + 40, CENTER_Y - 50, CENTER_X + 100, CENTER_Y - 50);
}
