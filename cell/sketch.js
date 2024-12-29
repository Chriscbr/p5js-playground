const BLACK = [0, 0, 0, 255];
const WHITE = [255, 255, 255, 255];

function setup() {
  const CANVAS_WIDTH = windowWidth;
  const CANVAS_HEIGHT = windowHeight;

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  background(BLACK);

  const CENTER_X = CANVAS_WIDTH / 2;
  const CENTER_Y = CANVAS_HEIGHT / 2;

  const CELL_DIAMETER = min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.8;

  drawingContext.filter = 'blur(10px)';

  fill(50, 44, 39);
  circle(CENTER_X, CENTER_Y, CELL_DIAMETER * 1.10);

  drawingContext.filter = 'blur(5px)';

  fill(68, 64, 49);
  circle(CENTER_X, CENTER_Y, CELL_DIAMETER * 1.05);

  fillGradient('radial', {
    from: [CENTER_X, CENTER_Y, 0],
    to: [CENTER_X, CENTER_Y, CELL_DIAMETER / 2],
    steps: [
      [color(150, 150, 150), 0],
      [color(100, 100, 100), 0.3],
      [color(100, 100, 100), 0.45],
      [color(250, 250, 250), 1.0],
    ]
  })

  circle(CENTER_X, CENTER_Y, CELL_DIAMETER);

  // == hexagon structure ==

  drawingContext.filter = 'blur(2px)';

  stroke(250, 250, 250);
  fill(255, 255, 255, 0);
  let hexagonAngle = 0;
  for (let i = 0; i < 91; i++) {
    let hexagonX = CENTER_X + sin(hexagonAngle) * (CELL_DIAMETER * 0.485);
    let hexagonY = CENTER_Y - cos(hexagonAngle) * (CELL_DIAMETER * 0.485);
    let offset = 0;
    for (let i = 0; i < 20; i++) {
      let hexagonSize = 10 - (i * 0.2);
      offset += hexagonSize;
      strokeWeight(max(1.5 - (i * 0.1), 0.1));
      hexagon(hexagonX, hexagonY, hexagonSize, hexagonAngle)
      hexagonX = CENTER_X + sin(hexagonAngle) * (CELL_DIAMETER * 0.485 - offset);
      hexagonY = CENTER_Y - cos(hexagonAngle) * (CELL_DIAMETER * 0.485 - offset);
    }
    hexagonAngle += 0.069;
  }
  hexagonAngle = 0.035
  for (let i = 0; i < 91; i++) {
    let hexagonX = CENTER_X + sin(hexagonAngle) * (CELL_DIAMETER * 0.478);
    let hexagonY = CENTER_Y - cos(hexagonAngle) * (CELL_DIAMETER * 0.478);
    let offset = 0;
    for (let i = 0; i < 20; i++) {
      let hexagonSize = 10 - (i * 0.2);
      offset += hexagonSize;
      strokeWeight(max(1.5 - (i * 0.1), 0.1));
      hexagon(hexagonX, hexagonY, hexagonSize, hexagonAngle)
      hexagonX = CENTER_X + sin(hexagonAngle) * (CELL_DIAMETER * 0.478 - offset);
      hexagonY = CENTER_Y - cos(hexagonAngle) * (CELL_DIAMETER * 0.478 - offset);
    }
    hexagonAngle += 0.069;
  }

  // == yellow splotches ==

  // drawingContext.filter = 'blur(0px)';

  // noStroke();
  // for (let i = 0; i < 500; i++) {
  //   let randomAngle = random(0, 2 * PI);
  //   let randomRadius = (CELL_DIAMETER * 0.47) - pow(random(0, 1), 3) * 50;
  //   let blobX = CENTER_X + sin(randomAngle) * randomRadius;
  //   let blobY = CENTER_Y - cos(randomAngle) * randomRadius;
  //   let blobSize = random(30, 50);
  //   fillGradient('radial', {
  //     from: [blobX, blobY, 0],
  //     to: [blobX, blobY, blobSize / 2],
  //     steps: [
  //       // [color(156, 130, 50, 100), 0],
  //       // [color(180, 150, 45, 80), 0.4],
  //       [color(252, 199, 35, 100), 0],
  //       [color(252, 199, 35, 50), 0.5],
  //       [color(252, 213, 93, 0), 1],
  //     ]
  //   })
  //   circle(blobX, blobY, blobSize);
  // }

  // // white circle again

  // drawingContext.filter = 'blur(5px)';

  // noFill()
  // stroke(255, 255, 255, 255);
  // strokeWeight(10);
  // circle(CENTER_X, CENTER_Y, CELL_DIAMETER * 0.99);
  // stroke(42, 236, 250, 255);

  // == white tripoint lines == 

  drawingContext.filter = 'blur(2px)';

  let tRadius = 10;
  for (let i = 0; i < 200; i++) {
    let randomAngle = random(0, 2 * PI);
    let distFromCenter = random(20, 80);
    let tCenterX = CENTER_X + sin(randomAngle) * distFromCenter;
    let tCenterY = CENTER_Y - cos(randomAngle) * distFromCenter;
    stroke(255, 255, 255, 255 * ((80 - distFromCenter) / 80));
    strokeWeight(0.5);
    let randomAngle2 = random(0, 2 * PI);
    line(tCenterX, tCenterY, tCenterX + sin(randomAngle2) * tRadius, tCenterY - cos(randomAngle2) * tRadius);
    line(tCenterX, tCenterY, tCenterX + sin(randomAngle2 + (2 * PI / 3)) * tRadius, tCenterY - cos(randomAngle2 + (2 * PI / 3)) * tRadius);
    line(tCenterX, tCenterY, tCenterX + sin(randomAngle2 + (4 * PI / 3)) * tRadius, tCenterY - cos(randomAngle2 + (4 * PI / 3)) * tRadius);
  }

  // == pill shape things ==

  drawingContext.filter = 'blur(2px)';

  for (let i = 0; i < 50; i++) {
    let baseAngle = 2 * PI / 50 * i;
    let globalAngle = baseAngle;
    let pillAngle = baseAngle + random(-0.5, 0.5);
    let pillSize = random(15, 22);
    let distFromCenter = random(170, 270);
    let pillX = CENTER_X + sin(globalAngle) * distFromCenter;
    let pillY = CENTER_Y - cos(globalAngle) * distFromCenter;

    noFill();
    stroke(255, 255, 255, 255);
    strokeWeight(0.5);
    drawPill(pillX, pillY, pillSize, pillSize * 0.6, pillAngle + PI / 2);
    fill(0, 0, 0, 50);
    drawPill(pillX, pillY - 2, pillSize, pillSize * 0.6, pillAngle + PI / 2);
  }

  for (let i = 0; i < 50; i++) {
    let baseAngle = 2 * PI / 50 * i;
    let globalAngle = baseAngle;
    let pillAngle = baseAngle + random(-0.5, 0.5);
    let pillSize = random(15, 22);
    let distFromCenter = random(100, 170);
    let pillX = CENTER_X + sin(globalAngle) * distFromCenter;
    let pillY = CENTER_Y - cos(globalAngle) * distFromCenter;

    noFill();
    stroke(255, 255, 255, 255);
    strokeWeight(0.5);
    drawPill(pillX, pillY, pillSize, pillSize * 0.6, pillAngle + PI / 2);
    fill(0, 0, 0, 50);
    drawPill(pillX, pillY - 2, pillSize, pillSize * 0.6, pillAngle + PI / 2);
  }

  for (let i = 0; i < 60; i++) {
    let baseAngle = 2 * PI / 60 * i;
    let globalAngle = baseAngle;
    let pillAngle = baseAngle + random(-0.5, 0.5);
    let pillSize = random(15, 22);
    let distFromCenter = random(65, 100);
    let pillX = CENTER_X + sin(globalAngle) * distFromCenter;
    let pillY = CENTER_Y - cos(globalAngle) * distFromCenter;

    noFill();
    stroke(255, 255, 255, 255);
    strokeWeight(0.5);
    drawPill(pillX, pillY, pillSize, pillSize * 0.6, pillAngle + PI / 2);
    fill(0, 0, 0, 50);
    drawPill(pillX, pillY - 2, pillSize, pillSize * 0.6, pillAngle + PI / 2);
  }

  for (let i = 0; i < 50; i++) {
    let baseAngle = 2 * PI / 50 * i;
    let globalAngle = baseAngle;
    let pillAngle = baseAngle + random(-0.5, 0.5);
    let pillSize = random(15, 22);
    let distFromCenter = random(35, 65);
    let pillX = CENTER_X + sin(globalAngle) * distFromCenter;
    let pillY = CENTER_Y - cos(globalAngle) * distFromCenter;

    noFill();
    stroke(255, 255, 255, 255);
    strokeWeight(0.5);
    drawPill(pillX, pillY, pillSize, pillSize * 0.6, pillAngle + PI / 2);
    fill(0, 0, 0, 50);
    drawPill(pillX, pillY - 2, pillSize, pillSize * 0.6, pillAngle + PI / 2);
  }

  // noFill();
  // stroke(255, 255, 255, 255);
  // strokeWeight(0.5);
  // drawPill(CENTER_X, CENTER_Y, 25, 15, PI / 6);
  // fill(0, 0, 0, 50);
  // drawPill(CENTER_X, CENTER_Y - 2, 25, 15, PI / 6);
}

function hexagon(x, y, size, rotation) {
  beginShape();
  for (let i = 3; i < 7; i++) {
    let angle = i * PI / 3 + rotation;
    let vertexX = x + size / 2 * cos(angle);
    let vertexY = y + size / 2 * sin(angle);
    vertex(vertexX, vertexY);
  }
  endShape(OPEN);
}

function drawPill(cx, cy, w, h, angle) {
  push(); // Save the current transformation state
  translate(cx, cy); // Move the origin to the center of the pill
  rotate(angle); // Rotate the coordinate system by the given angle

  let r = h / 2; // Radius for rounded ends
  let x = -w / 2; // Adjust x to center the pill horizontally
  let y = -h / 2; // Adjust y to center the pill vertically

  // Draw the left rounded end
  arc(x + r, y + r, h, h, HALF_PI, HALF_PI + PI);
  // Draw the right rounded end
  arc(x + w - r, y + r, h, h, -HALF_PI, HALF_PI);
  // Draw the horizontal lines connecting the arcs
  line(x + r, y, x + w - r, y);
  line(x + r, y + h, x + w - r, y + h);

  // Fill the pill
  noStroke();
  quad(x + r, y, x + w - r, y, x + w - r, y + h, x + r, y + h);

  pop(); // Restore the original transformation state
}
