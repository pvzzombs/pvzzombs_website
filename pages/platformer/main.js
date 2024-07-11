var player;
var platforms;
var platformTest;
var leftKeyPressed = false;
var rightKeyPressed = false;

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

}

p5.disableFriendlyErrors = true;

function setup() {
  var cv = createCanvas(400, 300);
  cv.parent("canvas");
  player = new Player();
  platforms = [];
  // for (var i = 0; i < 3; i++) {
  //   platforms.push(new Platform());
  // }
  platformTest = new Platform();
  platformTest.y = 250;
  platformTest.x = 150;
}

function draw() {
  mainGame();
}

function mainGame() {
  background(128);
  if (player.y + player.height + player.dy >= 300) {
    player.dy = 0;
    player.y = 300 - player.height;
  } else {
    player.dy += player.gravity;
  }
  
  player.dx = 0;
  if (leftKeyPressed) {
    player.dx = -1;
  } else if (rightKeyPressed) {
    player.dx = 1;
  }

  // for (var i = 0; i < 3; i++) {
  //   platforms[i].update();
  // }
  platformTest.update();
  player.update();


  platformTest.draw();
  player.draw();
  // for (var i = 0; i < 3; i++) {
  //   platforms[i].draw();
  // }
}

function mousePressed() {

}

function touchStarted() {

}

function keyPressed() {
  switch (key) {
    case " ":
      if (player.dy === 0) player.dy = -15;
      break;
    case "s":
    case "S":
      player.dy += player.gravity;
      break;
    case "a":
    case "A":
      leftKeyPressed = true;
      break;
    case "d":
    case "D":
      rightKeyPressed = true;
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
      break;
    case "d":
    case "D":
      rightKeyPressed = false;
      break;
  }
  player.update();
  player.draw();
}