// sprites
var tileMapSprite;
var playerSprite;

// world size
var worldWidth = 320;
var worldHeight = 320;

// entities
var player;
var worldLoader;

// for events
var currentKey = " ";

// is mobile?
var isMobile = false;

// check if mobile
if (typeof window.ontouchstart !== "undefined" || navigator.maxTouchPoints > 0) {
  isMobile = true;
}

function toggleFullscreen() {
  console.log("Toggle fullscreen");
  // alert();
  // var elem = document.getElementsByTagName("canvas")[0];
  var elem = document.getElementById("canvas");
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(function(err) {
      console.log(err);
    });
    screen.orientation.lock('landscape');
    fullScreenBtn.label = exitFullscreenSprite;
  } else {
    document.exitFullscreen().catch(function(err) {
      console.log(err);
    });
    fullScreenBtn.label = fullScreenBtnSprite;
  }
}

window.onload = function() {
  document.getElementById("full").onclick = toggleFullscreen;
}

function preload() {
  tileMapSprite = new JSSpriteSheet("img/tilemap_packed.png");
  playerSprite = new JSSpriteSheet("img/character.png");
  tileMapSprite.loadP5Image();
  playerSprite.loadP5Image();
}

p5.disableFriendlyErrors = true;

function setup() {
  var cv = createCanvas(worldWidth, worldHeight);
  cv.parent("canvas");
  noSmooth();
  randomSeed(100);
  worldLoader = new WorldLoader();
  player = new Player();
}

function draw() {
  mainGame();
}

function mainGame() {
  clear();
  background(128);

  // update
  player.vx = 0;
  player.vy = 0;
  if (currentKey !== " ") {
    switch (currentKey) {
      case "w":
        player.vy = -2;
      break;
      case "a":
        player.vx = -2;
      break;
      case "s":
        player.vy = 2;
      break;
      case "d":
        player.vx = 2;
      break;
    }
  }
  player.x += player.vx;
  player.y += player.vy;

  // draw
  worldLoader.draw(0, 0);
  player.draw(0, 0);
}

function mousePressed() {

}

function touchStarted() {
  
}

function touchEnded() {
  
}

function keyPressed() {
  switch (key) {
    case "W": case "w":
      if (currentKey !== " ") { return; }
      currentKey = "w";
    break;
    case "A": case "a":
      if (currentKey !== " ") { return; }
      currentKey = "a";
    break;
    case "S": case "s":
      if (currentKey !== " ") { return; }
      currentKey = "s";
    break;
    case "D": case "d":
      if (currentKey !== " ") { return; }
      currentKey = "d";
    break;
  }
}

function keyReleased() {
  switch (key) {
    case "W": case "w":
      if (currentKey !== "w") { return; }
      currentKey = " ";
    break;
    case "A": case "a":
      if (currentKey !== "a") { return; }
      currentKey = " ";
    break;
    case "S": case "s":
      if (currentKey !== "s") { return; }
      currentKey = " ";
    break;
    case "D": case "d":
      if (currentKey !== "d") { return; }
      currentKey = " ";
    break;
  }
}