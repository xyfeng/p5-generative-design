/*
 * draw the color spectrum by moving the mouse
 *
 * MOUSE
 * position x          : saturation
 * position y          : brighness
 *
 * KEYS
 * 1-5                 : number of segments
 * s                   : save png
 */

 /* bug */

var segmentCount = 360;
var radius = 300;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  noStroke();
  colorMode(HSB, 360, width, height);
  background(360);

  var angleStep = 360.0 / segmentCount;

  beginShape(TRIANGLE_FAN);
  vertex(width / 2, height / 2);
  for (var angle = 0; angle <= 360; angle += angleStep) {
    var vx = width / 2 + cos(radians(angle)) * radius;
    var vy = height / 2 + sin(radians(angle)) * radius;
    fill(angle, mouseX, mouseY);
    vertex(vx, vy);
  }
  endShape();
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    var now = new Date();
    save(now.toLocaleTimeString() + "_##.png");
  }

  switch (key) {
    case '1':
      segmentCount = 360;
      break;
    case '2':
      segmentCount = 45;
      break;
    case '3':
      segmentCount = 24;
      break;
    case '4':
      segmentCount = 12;
      break;
    case '5':
      segmentCount = 6;
      break;
  }
}
