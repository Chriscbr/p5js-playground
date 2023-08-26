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

let blob1;
let blob2;
let blob3;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  // noLoop();

  class Blob {
    constructor(centerX, centerY, radius, stretch, stretchAngle) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.radius = radius;
      this.points = [];
      this.numPoints = 7;
      this.stretch = stretch ?? 1;
      this.stretchAngle = stretchAngle ?? 0;

      for (let i = 0; i < this.numPoints; i++) {
        const dr2 = 0;
        const dr = dr2;
        const r = radius + dr;
        const angle = i * TWO_PI / this.numPoints;
        const stretch = 1 + this.stretch * abs(cos(angle - this.stretchAngle));
        const x = (r * stretch) * cos(angle);
        const y = (r * stretch) * sin(angle);
        this.points.push({ r, dr, dr2, x, y });
      }
    }

    update() {
      for (let i = 0; i < this.numPoints; i++) {
        const point = this.points[i];

        let dr2 = point.dr2;
        dr2 += random(-0.001 * this.radius, 0.001 * this.radius);
        dr2 = dr2 * 0.998 + 0 * 0.002;

        let dr = point.dr;
        dr += dr2;
        dr = dr * 0.8 + 0 * 0.2;

        let r = point.r;
        r += dr;
        r = r * 0.8 + this.radius * 0.2;
        
        const angle = i * TWO_PI / this.numPoints;
        const stretch = 1 + this.stretch * abs(cos(angle - this.stretchAngle));
        point.r = r;
        point.dr = dr;
        point.dr2 = dr2;
        point.x = (r * stretch) * cos(angle);
        point.y = (r * stretch) * sin(angle);
      }
    }

    display() {
      beginShape();
      for (let i = 0; i < this.numPoints; i++) {
        const point = this.points[i];
        curveVertex(this.centerX + point.x, this.centerY + point.y);
      }
      // repeat first three points for curveVertex to work
      for (let i = 0; i < 3; i++) {
        const point = this.points[i];
        curveVertex(this.centerX + point.x, this.centerY + point.y);
      }
      endShape();
    }
  }

  blob1 = new Blob(CENTER_X - 80, CENTER_Y, 50, 1, 0.4 * PI);
  blob2 = new Blob(CENTER_X + 100, CENTER_Y - 80, 50);
  blob3 = new Blob(CENTER_X + 80, CENTER_Y + 80, 40, 1, 0.8 * PI);
}

// from https://math.stackexchange.com/questions/2981683/how-to-adjust-the-curve-of-a-sine-wave-formula
function makeCurvy(t) {
  const a = 0.3;
  return t / (1 - a + a * abs(t));
}

function draw() {
  fill(...WHITE);
  rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  strokeWeight(1);
  beginShape();

  noStroke();

  fill(...WING_YELLOW);
  blob3.display();
  blob3.update();
  fill(...WING_LIGHT_GREEN);
  blob2.display();
  blob2.update();
  fill(...WING_DARK_GREEN);
  blob1.update();
  blob1.display();

  function drawWing(startX, startY, width, height) {
    function drawHalfWing(startX, startY, width, height) {
      const STEPS = 200;
      for (let i = 5; i < STEPS - 5; i++) {
        let x = lerp(0, width, i / STEPS);
        let y = makeCurvy(sin(lerp(-0.5 * PI, 1.5 * PI, i / STEPS))) * height / 2 + (height / 2);
        point(startX + x, startY + y);
      }
    }

    drawHalfWing(startX + width * 0.025, startY, width * 0.7, height);
    drawHalfWing(startX + width * 0.275, startY, width * 0.7, height);

    line(startX, startY, startX + width * 0.29, startY);
    line(startX + width * 0.71, startY, startX + width, startY);
  }

  stroke(...BLACK);

  strokeWeight(17);
  strokeCap(SQUARE);
  drawWing(100, 180, 300, 150);
  noFill();
}
