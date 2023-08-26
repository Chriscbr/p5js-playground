const CANVAS_SIZE = 500;
const CENTER_X = CANVAS_SIZE / 2;
const CENTER_Y = CANVAS_SIZE / 2;

const WHITE = [255, 255, 255, 255];
const BLACK = [0, 0, 0, 255];
const WING_DARKER_GREEN = [26, 54, 51, 255];
const WING_DARK_GREEN = [68, 137, 126, 255];
const WING_LIGHT_GREEN = [103, 210, 193, 255];

let blob1;
let blob2;
let blob3;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  // noLoop();

  class Blob {
    constructor(centerX, centerY, radius) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.radius = radius;
      this.points = [];
      this.numPoints = 10;
  
      for (let i = 0; i < this.numPoints; i++) {
        const r = random(radius, radius);
        const dr = random(-0.01 * radius, 0.01 * radius);
        this.points.push({
          r,
          dr,
          x: r * cos(i * TWO_PI / this.numPoints),
          y: r * sin(i * TWO_PI / this.numPoints)
        });
      }
    }

    update() {
      for (let i = 0; i < this.numPoints; i++) {
        const point = this.points[i];

        let dr = point.dr;
        dr += random(-0.01 * this.radius, 0.01 * this.radius);
        dr = dr * 0.95 + 0 * 0.05;

        let r = point.r;
        r += dr;
        r = r * 0.95 + this.radius * 0.05;

        point.r = r;
        point.dr = dr;
        point.x = r * cos(i * TWO_PI / this.numPoints);
        point.y = r * sin(i * TWO_PI / this.numPoints);
      }
    }

    display() {
      beginShape();
      for (let i = 0; i < this.numPoints; i++) {
        const point = this.points[i];
        curveVertex(this.centerX + point.x, this.centerY + point.y);
      }
      curveVertex(this.centerX + this.points[0].x, this.centerY + this.points[0].y);
      curveVertex(this.centerX + this.points[1].x, this.centerY + this.points[1].y);
      curveVertex(this.centerX + this.points[2].x, this.centerY + this.points[2].y);
      endShape();
    }
  }

  blob1 = new Blob(CENTER_X, CENTER_Y, 250);
  blob2 = new Blob(CENTER_X, CENTER_Y, 100);
  blob3 = new Blob(CENTER_X, CENTER_Y, 60);
}

// from https://math.stackexchange.com/questions/2981683/how-to-adjust-the-curve-of-a-sine-wave-formula
function makeCurvy(t) {
  const a = 0.3;
  return t / (1 - a + a * abs(t));
}

function draw() {
  fill(...BLACK);
  rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  strokeWeight(1);
  beginShape();

  noStroke();

  // fill(...WING_DARKER_GREEN);
  // blob1.update();
  // blob1.display();

  fill(...WING_DARK_GREEN);
  blob2.update();
  blob2.display();
  
  fill(...WING_LIGHT_GREEN);
  blob3.update();
  blob3.display();

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
