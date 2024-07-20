var player;
var platforms;
var platformTest;
var ground;
var details;

var leftKeyPressed = false;
var rightKeyPressed = false;
var centerCamera = true;
var platformsCount = 10;

// sprites
var playerSpriteIdleLeft;
var playerSpriteRunLeft;
var playerSpriteIdleRight;
var playerSpriteRunRight;
var platformSprite;
var worldSprite;

// gui sprites
var leftBtnSprite;
var rightBtnSprite;
var jumpBtnSprite;
var fullScreenBtnSprite;
var centerViewBtnSprite;
var exitFullscreenSprite;

// gui
// var gui;
var leftBtn;
var rightBtn;
var jumpBtn;
var fullScreenBtn;
var centerViewBtn;

// world size
var worldWidth = 640;
var worldHeight = 360;

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

function loadingText() {
  var loadingTextElement = document.getElementById("loadingText");
  if (loadingTextElement) {
    loadingTextElement.innerText = "Loaded " + (++currentImageLoadedLength) + "/" + imagesLength;
  }
  if (currentImageLoadedLength === imagesLength) {
    loadingTextElement.style.display = "none";
    // loop();
    shouldDisplay = true;
  }
}

function loadingError(e) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "An error occured while loading the image. Please refresh this page or try again later."
  });
}

function preload() {
  playerSpriteIdleLeft = new JSAnimatedSprite("img/idleLeft.png", 4, 5, 15, 21);
  playerSpriteIdleRight = new JSAnimatedSprite("img/idleRight.png", 4, 5, 15, 21);
  playerSpriteRunLeft = new JSAnimatedSprite("img/runLeft.png", 4, 5, 16, 20);
  playerSpriteRunRight = new JSAnimatedSprite("img/runRight.png", 4, 5, 16, 20);
  platformSprite = new JSSprite("img/platforms.png", 0, 0, 16, 16);
  worldSprite = new JSSpriteSheet("img/world_tileset.png");

  playerSpriteIdleLeft.loadP5Image();
  playerSpriteIdleRight.loadP5Image();
  playerSpriteRunLeft.loadP5Image();
  playerSpriteRunRight.loadP5Image();
  platformSprite.loadP5Image();
  worldSprite.loadP5Image();

  // gui
  leftBtnSprite = new JSSprite("img/backward.png", 0, 0, 50, 50);
  rightBtnSprite = new JSSprite("img/forward.png", 0, 0, 50, 50);
  jumpBtnSprite = new JSSprite("img/up.png", 0, 0, 50, 50);
  fullScreenBtnSprite = new JSSprite("img/larger.png", 0, 0, 50, 50);
  centerViewBtnSprite = new JSSprite("img/gear.png", 0, 0, 50, 50);
  exitFullscreenSprite = new JSSprite("img/smaller.png", 0, 0, 50, 50);

  leftBtnSprite.loadP5Image();
  rightBtnSprite.loadP5Image();
  jumpBtnSprite.loadP5Image();
  fullScreenBtnSprite.loadP5Image();
  centerViewBtnSprite.loadP5Image();
  exitFullscreenSprite.loadP5Image();
}

p5.disableFriendlyErrors = true;

function setup() {
  var cv = createCanvas(worldWidth, worldHeight);
  cv.parent("canvas");
  noSmooth();
  randomSeed(100);
  player = new Player();
  ground = new Ground();
  details = new Details();
  platforms = [];
  var startX = 0
  var startY = 340;
  for (var i = 0; i < platformsCount; i++) {
    platforms.push(new Platform());
    platforms[i].x = startX;
    platforms[i].y = startY;
    startX += 100;
    startY -= 20;
  }
  // platformTest = new Platform();
  // platformTest.y = 250;
  // platformTest.x = 150;
  player.currentSprite = playerSpriteIdleRight;

  leftBtn = new Button(leftBtnSprite, 10, 240, 50, 50);
  rightBtn = new Button(rightBtnSprite, 80, 240, 50, 50);
  jumpBtn = new Button(jumpBtnSprite, 580, 240, 50, 50);
  // 580 to 10
  fullScreenBtn = new Button(fullScreenBtnSprite, 10, 10, 50, 50);
  centerViewBtn = new Button(centerViewBtnSprite, 580, 10, 50, 50);
}

function draw() {
  mainGame();
}

function mainGame() {
  background(128);
  if (player.y + player.height + player.dy >= worldHeight) {
    player.dy = 0;
    player.y = worldHeight - player.hitbox.height - player.hitbox.y;
    player.canJump = true;
  } else {
    player.dy += player.gravity;
    player.canJump = false;
  }
  
  player.dx = 0;
  if (leftKeyPressed) {
    player.dx = -4;
  } else if (rightKeyPressed) {
    player.dx = 4;
  }

  for (var i = 0; i < platformsCount; i++) {
    platforms[i].update();
  }
  // platformTest.update();
  player.update();


  // platformTest.draw();
  if (centerCamera) {
    var centerX = worldWidth / 2;
    var centerY = worldHeight / 2;
    var adjX = centerX - ((player.x + player.hitbox.x) + (player.hitbox.width / 2));
    var adjY = centerY - ((player.y + player.hitbox.y) + (player.hitbox.height / 2));
    for (var i = 0; i < platformsCount; i++) {
      // platforms[i].drawXY(platforms[i].x + adjX, platforms[i].y + adjY);
      platforms[i].drawDelta(adjX, adjY);
    }
    // player.drawXY(player.x + adjX, player.y + adjY);
    player.drawDelta(adjX, adjY);


    // fill("blue");
    // rect(-1000 + adjX, worldHeight + adjY, 2000, 100);
    // worldSprite.drawP5Image(0, 0, 20, 20, 0, 0, 16, 16);
    ground.drawDelta(adjX, adjY);
    details.drawDelta(adjX, adjY);

  } else {
    for (var i = 0; i < platformsCount; i++) {
      platforms[i].draw();
    }
    player.draw();
  }

  if (isMobile) {
    leftBtn.draw();
    rightBtn.draw();
    jumpBtn.draw();
    fullScreenBtn.draw();
    centerViewBtn.draw();
  }

}

function mousePressed() {

}

function touchStarted() {
  if (!leftBtn.active && leftBtn.isTouchOver()) {
    leftBtn.active = true;
    leftKeyPressed = true;
    rightKeyPressed = false;
    player.currentSprite = playerSpriteRunLeft;
  } else if (!rightBtn.active && rightBtn.isTouchOver()) {
    rightBtn.active = true;
    rightKeyPressed = true;
    leftKeyPressed = false;
    player.currentSprite = playerSpriteRunRight;
  }
  if (!jumpBtn.active && jumpBtn.isTouchOver()) {
    jumpBtn.active = true;
    if (player.canJump) {
      player.dy = -15;
      player.canJump = false;
    }
  }
  if (!fullScreenBtn.active && fullScreenBtn.isTouchOver()) {
    fullScreenBtn.active = true;
    toggleFullscreen();
  }
  if (!centerViewBtn.active && centerViewBtn.isTouchOver()) {
    centerViewBtn.active = true;
    centerCamera = !centerCamera;
  }
}

function touchEnded() {
  if (leftBtn.active && !leftBtn.isTouchOver()) {
    leftBtn.active = false;
    leftKeyPressed = false;
    player.currentSprite = playerSpriteIdleLeft;
  } else if (rightBtn.active && !rightBtn.isTouchOver()) {
    rightBtn.active = false;
    rightKeyPressed = false;
    player.currentSprite = playerSpriteIdleRight;
  }
  if (jumpBtn.active && !jumpBtn.isTouchOver()) {
    jumpBtn.active = false;
  }
  if (fullScreenBtn.active && !fullScreenBtn.isTouchOver()) {
    fullScreenBtn.active = false;
  }
  if (centerViewBtn.active && !centerViewBtn.isTouchOver()) {
    centerViewBtn.active = false;
  }
}

function keyPressed() {
  switch (key) {
    case " ":
      if (player.canJump) {
        player.dy = -15;
        player.canJump = false;
      }
      break;
    case "s":
    case "S":
      player.dy += player.gravity;
      break;
    case "a":
    case "A":
      if (rightKeyPressed) { return; }
      leftKeyPressed = true;
      player.currentSprite = playerSpriteRunLeft;
      break;
    case "d":
    case "D":
      if (leftKeyPressed) { return; }
      rightKeyPressed = true;
      player.currentSprite = playerSpriteRunRight;
      break;
    case "c":
    case "C":
      centerCamera = !centerCamera;
      break;
  }
  player.update();
  player.draw();
}

function keyReleased() {
  switch (key) {
    // case " ":
    //   if (player.dy === 0) player.dy = -15;
    //   break;
    case "a":
    case "A":
      if (rightKeyPressed) { return; }
      leftKeyPressed = false;
      player.currentSprite = playerSpriteIdleLeft;
      break;
    case "d":
    case "D":
      if (leftKeyPressed) { return; }
      rightKeyPressed = false;
      player.currentSprite = playerSpriteIdleRight;
      break;
  }
  player.update();
  player.draw();
}