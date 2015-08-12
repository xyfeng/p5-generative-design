/*
 * draw the color spectrum by moving the mouse
 *
 * MOUSE
 * position x/y        : resolution
 *
 * KEYS
 * s                   : save png
 */

var stepX;
var stepY;

function setup() {
  createCanvas(800, 400);
  background(0);
}

function draw() {
  noStroke();
  colorMode(HSB, width, height, 100);

  stepX = mouseX + 2;
  stepY = mouseY + 2;
  for (var gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    var now = new Date();
    save(now.toLocaleTimeString() + "_##.png");
  }
}
