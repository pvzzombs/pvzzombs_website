function loadingSucess() {

}

function loadingError(e) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "An error occured while loading the image. Please refresh this page or try again later."
  });
}

p5.disableFriendlyErrors = true;

function preload() {
  playerSprite = new JSAnimatedSprite("img/bird.png", 4, 5, 16, 16);
  pipesSprites = new JSSpriteSheet("img/pipes.png");
  backgroundSprite = new JSSprite("img/background.png", 0, 0, 256, 256);
  playerSprite.loadP5Image(loadingSucess, loadingError);
  pipesSprites.loadP5Image(loadingSucess, loadingError);
  backgroundSprite.loadP5Image(loadingSucess, loadingError);

  sfx_die = new Howl({
    src: ["sfx/die.wav"]
  });
  sfx_hit = new Howl({
    src: ["sfx/hit.wav"]
  });
  sfx_point = new Howl({
    src: ["sfx/point.wav"]
  });
  sfx_wing = new Howl({
    src: ["sfx/wing.wav"]
  });
  mainFont = loadFont("font/FlappyBirdRegular-9Pq0.ttf");
}

function setup() {
  var cv = createCanvas(300, 400);
  cv.parent("canvas");
  noSmooth();
  mgr = new SceneManager();
  // mgr.wire();
  mgr.addScene(mainScene);
  mgr.addScene(deathScene);
  // mgr.addScene(tryAgainScene);
  mgr.showScene(mainScene);
}

function draw() {
  mgr.draw();
}

function keyTyped() {
  mgr.handleEvent("keyTyped");
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}

function touchStarted() {
  mgr.handleEvent("touchStarted");
}