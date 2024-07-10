var player;

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
}

function draw() {
  mainGame();
}

function mainGame() {
  background(128);
  if(player.y + player.height + player.dy >= 300) {
    player.dy = 0;
  } else {
    player.dy += player.gravity;
  }
  player.update();
  player.draw();
}

function mousePressed() {

}

function touchStarted() {

}

function keyPressed() {
  switch (key) {
    case " ":
      if (player.dy === 0) player.dy = -10;
      break;
    case "a" : case "A":
      player.dx = -1
      break;
    case "d" : case "D":
      player.dx = 1;
      break;
  }
  player.update();
  player.draw();
}