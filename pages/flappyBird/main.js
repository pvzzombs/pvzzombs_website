//the world
var playerSprite;
var pipesSprites;
var backgroundSprite;

// constants
var gravity = 0.3;
var flap = -6;
// var friction = 0.99;
var speed = 2;

// var bird;
// var pipes;
// for relocating:
var birdPos = {
  x: 0,
  y: 0
};

var pipesPos = [
  {x: 0, y: 0, height: 0},
  {x: 0, y: 0, height: 0},
  {x: 0, y: 0, height: 0}
];

var score = 0;
var highScore = 0;
var speedUp = 0;

// for fps
var lastTime;
var nowTime;
var dt;
var fpm;

// sounds
var sfx_die;
var sfx_hit;
var sfx_point;
var sfx_wing;

// scenes
// var SCENE_MAIN = 1;
// var SCENE_DEATH = 2;
// var currentScene = SCENE_MAIN;

// bird death position
var birdDeathX;
var birdDeathY;

// Scene Manager
var mgr;

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
}

function setup() {
  var cv = createCanvas(300, 400);
  cv.parent("canvas");
  noSmooth();
  mgr = new SceneManager();
  // mgr.wire();
  mgr.addScene(mainScene);
  mgr.addScene(deathScene);
  mgr.showNextScene();

}

function draw() {
  mgr.draw();
}

function death() {
  
}

function mainGame() {
  
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