/**
 * extract and sort the color palette of an image
 *
 * MOUSE
 * position x          : resolution
 *
 * KEYS
 * 1-3                 : load different images
 * 4                   : no color sorting
 * 5                   : sort colors on hue
 * 6                   : sort colors on saturation
 * 7                   : sort colors on brightness
 * 8                   : sort colors on grayscale (luminance)
 * s                   : save png
 * p                   : save pdf
 * c                   : save color palette
 */

var img;
var colors = [];
var sortMode;

function preload(){
  img = loadImage("data/pic1.jpg");
}

function setup(){
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  noCursor();
}

function draw(){
  var tileCount = int(width / max(mouseX, 5));
  var rectSize = width / float(tileCount);

  // get colors from image
  var i = 0;
  for (var gridY=0; gridY<tileCount; gridY++) {
    for (var gridX=0; gridX<tileCount; gridX++) {
      var px = (int) (gridX * rectSize);
      var py = (int) (gridY * rectSize);
      colors[i] = img.get(px, py);
      i++;
    }
  }

  // sort colors
  // if (sortMode != null) colors = GenerativeDesign.sortColors(this, colors, sortMode);

  // draw grid
  var i = 0;
  for (var gridY=0; gridY<tileCount; gridY++) {
    for (var gridX=0; gridX<tileCount; gridX++) {
      fill(colors[i]);
      rect(gridX*rectSize, gridY*rectSize, rectSize, rectSize);
      i++;
    }
  }
}

function keyPressed() {
  if (key == '1'){
    loadImage("data/pic1.jpg", function(image) {
      img = image;
    });
  }
  if (key == '2'){
    loadImage("data/pic2.jpg", function(image) {
      img = image;
    });
  }
  if (key == '3'){
    loadImage("data/pic3.jpg", function(image) {
      img = image;
    });
  }

  // if (key == '4') sortMode = null;
  // if (key == '5') sortMode = GenerativeDesign.HUE;
  // if (key == '6') sortMode = GenerativeDesign.SATURATION;
  // if (key == '7') sortMode = GenerativeDesign.BRIGHTNESS;
  // if (key == '8') sortMode = GenerativeDesign.GRAYSCALE;

  if (key == 's' || key == 'S') {
    var now = new Date();
    save(now.toLocaleTimeString() + "_##.png");
  }
}
