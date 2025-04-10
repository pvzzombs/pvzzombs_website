var mfps = 60;
var prev, curr;
var dt;

var dinoSprites = [];
var dinoCurrentSprite = 0;
var dinoSpritesCount = 3;
var dinoSpriteSpeed = 12 / mfps;

var cactusSprite = null;


function preload() {
  for (var i = 0; i < dinoSpritesCount; i++) {
    dinoSprites.push(loadImage("img/Velociraptor/" + i + ".png"));
  }
  cactusSprite = loadImage("img/cactus2.png");
}

function setup() {
  var cv = createCanvas(400, 300);
  cv.parent("canvas");
  noSmooth();
  frameRate(mfps);
  prev = Date.now();
}

var rects = [];
var w = 50;
var h = 50;
var lastX = 400 - 200;

var m = 0.01;

var playerHeight = 100;
var playerWidth = 100;
var playerY = 300 - playerHeight;
var vel = 0;
var g = 0.5;

var score = 0;
var highScore = 0;

var currentScene = "main";
var shouldReset = false;

function drawDino() {
  image(dinoSprites[Math.floor(dinoCurrentSprite)], 10, playerY + 10, playerWidth, playerHeight, 0, 0, 500, 500);
  dinoCurrentSprite += dinoSpriteSpeed * dt;
  if (dinoCurrentSprite >= dinoSpritesCount) {
    dinoCurrentSprite = 0;
  }
}

function draw() {
  switch(currentScene) {
    case "main": 
      main();
    break;
    case "retry":
      shouldReset = true;
      retry();
    break;
  }
}

function retry() {
  curr = Date.now();
  dt = (curr - prev) * mfps / 1000;
  prev = Date.now();
  if (shouldReset) {
    rects = [];
    lastX = 400 - 200;
    playerY = 300 - playerHeight;
    vel = 0;
    highScore = Math.max(score, highScore);
    score = 0;
    shouldReset = false;
  }
  background(220);
  textSize(20);
  text("Press any key or click to restart", 0, 20);
  text("Highscore: " + Math.floor(highScore), 0, 40);
}

function main() {
  curr = Date.now();
  dt = (curr - prev) * mfps / 1000;
  prev = Date.now();
  // clear();
  background(220);
  var ra = noise(m);
  m += 0.01;
  // console.log(ra);
  if (lastX <= 400 - 200 && ra < 0.5) {
    rects.push({ x: 450 });
    // console.log(ra);
  }
  
  for (var i=0; i<rects.length; i++) {
    rects[i].x -= 5 * dt;
  }

  while(rects.length && rects[0].x < 0 - w) {
    rects.shift();
  }
  
  if (rects.length) {
    lastX = rects[rects.length - 1].x;
  } else {
    lastX = 400 - 200;
  }
  
  for (var i=0; i<rects.length; i++) {
    // fill("red");
    // rect(rects[i].x + 5, 300 - h, w - 10, h);
    image(cactusSprite, rects[i].x, 300 - h, w, h, 0, 0, 32, 32);
  }

  
  if (playerY >= 300 - playerHeight) {
    playerY = 300 - playerHeight;
    vel = 0;
  } else {
    vel += g * dt;
    playerY += vel * dt;
  }

  // check collision

  for (var i=0; i<rects.length; i++) {
    if(collideRectRect(45, playerY + 20, playerWidth - 60, playerHeight - 20, rects[i].x + 5, 300 - h, w - 10, h)) {
      console.log("Game Over");
      // noLoop();
      currentScene = "retry";
    }
  }
  
  // fill("green");
  // rect(45, playerY + 20, playerWidth - 60, playerHeight - 20);
  drawDino();
  score += 0.2 * dt;
  textSize(20);
  text("Score: " + Math.floor(score), 0, 20);
}

function keyPressed() {
  switch(currentScene) {
    case "main":
      if (key === " " && playerY >= 300 - playerHeight) {
        vel = -10;
        // console.log(vel);
        playerY += vel * dt;
      }
    break;
    case "retry":
      currentScene = "main";
    break;
  }
}

function touchStarted() {
  switch(currentScene) {
    case "main": 
      if (playerY >= 300 - playerHeight) {
        vel = -10;
        playerY += vel * dt;
      }
    break;
    case "retry":
      currentScene = "main";
    break;
  }
}

function mousePressed() {
  switch(currentScene) {
    case "main":
      if (playerY >= 300 - playerHeight) {
        vel = -10;
        playerY += vel * dt;
      }
    break;
    case "retry":
      currentScene = "main";
    break;
  }
}