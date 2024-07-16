var player;
var platforms;
var platformTest;
var ground;

var leftKeyPressed = false;
var rightKeyPressed = false;
var centerCamera = false;
var platformsCount = 10;

// sprites
var playerSpriteIdleLeft;
var playerSpriteRunLeft;
var playerSpriteIdleRight;
var playerSpriteRunRight;
var platformSprite;
var worldSprite;

// gui
var gui;
var leftBtn;
var rightBtn;
var jumpBtn;
var fullScreenBtn;
var centerViewBtn;

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
  } else {
    document.exitFullscreen().catch(function(err) {
      console.log(err);
    });
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
}

p5.disableFriendlyErrors = true;

function setup() {
  var cv = createCanvas(640, 360);
  cv.parent("canvas");
  noSmooth();
  player = new Player();
  ground = new Ground();
  platforms = [];
  var startX = 0
  var startY = 340;
  for (var i = 0; i < platformsCount; i++) {
    platforms.push(new Platform());
    platforms[i].x = startX;
    platforms[i].y = startY;
    startX += 100;
    startY -= 40;
  }
  // platformTest = new Platform();
  // platformTest.y = 250;
  // platformTest.x = 150;
  player.currentSprite = playerSpriteIdleRight;
  gui = createGui();
  leftBtn = createButton("A", 10, 240, 50, 50);
  rightBtn = createButton("D", 80, 240, 50, 50);
  jumpBtn = createButton(" ", 580, 240, 50, 50);
  // 580 to 10
  fullScreenBtn = createButton("F", 10, 10, 50, 50);
  centerViewBtn = createButton("C", 580, 10, 50, 50);
}

function draw() {
  mainGame();
}

function mainGame() {
  background(128);
  if (player.y + player.height + player.dy >= 360) {
    player.dy = 0;
    player.y = 360 - player.hitbox.height - player.hitbox.y;
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
    var centerX = 640 / 2;
    var centerY = 360 / 2;
    var adjX = centerX - ((player.x + player.hitbox.x) + (player.hitbox.width / 2));
    var adjY = centerY - ((player.y + player.hitbox.y) + (player.hitbox.height / 2));
    for (var i = 0; i < platformsCount; i++) {
      // platforms[i].drawXY(platforms[i].x + adjX, platforms[i].y + adjY);
      platforms[i].drawDelta(adjX, adjY);
    }
    // player.drawXY(player.x + adjX, player.y + adjY);
    player.drawDelta(adjX, adjY);


    // fill("blue");
    // rect(-1000 + adjX, 360 + adjY, 2000, 100);
    // worldSprite.drawP5Image(0, 0, 20, 20, 0, 0, 16, 16);
    ground.drawDelta(adjX, adjY);
  } else {
    for (var i = 0; i < platformsCount; i++) {
      platforms[i].draw();
    }
    player.draw();
  }
  if (leftBtn.isPressed) {
    leftKeyPressed = true;
    rightKeyPressed = false;
    player.currentSprite = playerSpriteRunLeft;
  } else if (rightBtn.isPressed) {
    rightKeyPressed = true;
    leftKeyPressed = false;
    player.currentSprite = playerSpriteRunRight;
  }
  if (fullScreenBtn.isPressed) {
    toggleFullscreen();
  }
  if (jumpBtn.isPressed) {
    if (player.canJump) {
      player.dy = -15;
      player.canJump = false;
    }
  }

  if (centerViewBtn.isPressed) {
    centerCamera = !centerCamera;
  }

  if (leftBtn.isReleased) {
    leftKeyPressed = false;
    player.currentSprite = playerSpriteIdleLeft;
  } else if (rightBtn.isReleased) {
    rightKeyPressed = false;
    player.currentSprite = playerSpriteIdleRight;
  }
  drawGui();
}

function mousePressed() {

}

function touchStarted() {

}

function touchEnded() {
  
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
      leftKeyPressed = true;
      rightKeyPressed = false;
      player.currentSprite = playerSpriteRunLeft;
      break;
    case "d":
    case "D":
      rightKeyPressed = true;
      leftKeyPressed = false;
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
      leftKeyPressed = false;
      player.currentSprite = playerSpriteIdleLeft;
      break;
    case "d":
    case "D":
      rightKeyPressed = false;
      player.currentSprite = playerSpriteIdleRight;
      break;
  }
  player.update();
  player.draw();
}