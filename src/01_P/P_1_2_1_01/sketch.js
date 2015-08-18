/*
 * shows how to interpolate colors in different styles/ color modes
 *
 * MOUSE
 * left click          : new random color set
 * position x          : interpolation resolution
 * position y          : row count
 *
 * KEYS
 * 1-2                 : switch interpolation style
 * s                   : save png
 * c                   : save color palette
 */

var tileCountX = 2;
var tileCountY = 10;

var colorsLeft = [];
var colorsRight = [];
var colors = [];

var interpolateShortest = true;

function setup() {
  createCanvas(800, 800);

  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  shakeColors();
}

function draw() {
  tileCountX = int(map(mouseX, 0, width, 2, 100));
  tileCountY = int(map(mouseY, 0, height, 2, 10));
  var tileWidth = width / float(tileCountX);
  var tileHeight = height / float(tileCountY);
  var interCol;

  // just for ase export
  var i = 0;

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    var col1 = colorsLeft[gridY];
    var col2 = colorsRight[gridY];

    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var amount = map(gridX, 0, tileCountX - 1, 0, 1);

      if (interpolateShortest) {
        // switch to rgb
        colorMode(RGB, 255, 255, 255, 255);
        interCol = lerpColor(col1, col2, amount);
        // switch back
        colorMode(HSB, 360, 100, 100, 100);
      } else {
        interCol = lerpColor(col1, col2, amount);
      }
      fill(interCol);

      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;
      rect(posX, posY, tileWidth, tileHeight);

      // just for ase export
      colors[i] = interCol;
      i++;
    }
  }
}

function shakeColors() {
  for (var i = 0; i < tileCountY; i++) {
    colorsLeft[i] = color(random(0, 60), random(0, 100), 100);
    colorsRight[i] = color(random(160, 190), 100, random(0, 100));
  }
}

function mouseReleased() {
  shakeColors();
}

function keyPressed() {
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;

  if (key == 's' || key == 'S') {
    var now = new Date();
    save(now.toLocaleTimeString() + "_##.png");
  }
}
