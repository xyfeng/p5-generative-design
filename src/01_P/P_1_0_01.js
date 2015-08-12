/*
 * changing colors and size by moving the mouse
 *
 * MOUSE
 * position x          : size
 * position y          : color
 *
 * KEYS
 * s                   : save png
 */

function setup() {
  createCanvas(720, 720);
  noCursor();
}

function draw() {
  colorMode(HSB, 360, 100, 100);

  rectMode(CENTER);
  noStroke();
  background(mouseY / 2, 100, 100);

  fill(360 - mouseY / 2, 100, 100);
  rect(360, 360, mouseX + 1, mouseX + 1);
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    var now = new Date();
    save(now.toLocaleTimeString() + "_" + frameCount + ".png");
  }
}
