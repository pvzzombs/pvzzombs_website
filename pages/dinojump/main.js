function setup() {
  var cv = createCanvas(400, 300);
  cv.parent("canvas");
}

var rects = [];
var w = 20;
var h = 20;
var lastX = 400 - w - 100;

var m = 0.01;

var playerY = 300 - h;
var vel = 0;
var g = 0.5;

function draw() {
  // clear();
  background(220);
  var ra = noise(m);
  m += 0.01;
  // console.log(ra);
  if (lastX <= 300 && ra < 0.5) {
    rects.push({ x: 400 });
    // console.log(ra);
  }
  
  for (var i=0; i<rects.length; i++) {
    rects[i].x -= 2;
  }

  while(rects.length && rects[0].x < 0 - w) {
    rects.shift();
  }
  
  if (rects.length) {
    lastX = rects[rects.length - 1].x;
  } else {
    lastX = 300;
  }
  
  for (var i=0; i<rects.length; i++) {
    fill("red");
    rect(rects[i].x, 300 - h, w, h);
  }

  vel += g;
  playerY += vel;
  fill("green");
  if (playerY >= 300 - h) {
    playerY = 300 - h;
    vel = 0;
  }

  // check collision

  for (var i=0; i<rects.length; i++) {
    if(collideRectRect(10, playerY, w, h, rects[i].x, 300 - h, w, h)) {
      console.log("Game Over");
      noLoop();
    }
  }

  rect(10, playerY, w, h);
}

function keyPressed() {
  if (key === " " && playerY >= 300 - h) {
    vel = -10;
    playerY += vel;
  }
}