//the world
var playerSprite;
var pipesSprites;
var backgroundSprite;
var gravity = 0.3;
var flap = -6;
// var friction = 0.99;
var speed = 2;
var bird;
var pipes;
var score = 0;
var highScore = 0;
var speedUp = 0;

// for fps
var lastTime;
var nowTime;
var dt;
var fpm;

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
  bird = new Bird();
  pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
  var pipeStartX = 0;
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].x = pipeStartX + 350;
    pipeStartX += 200;
  }
  playerSprite = new JSAnimatedSprite("img/bird.png", 4, 5, 16, 16);
  pipesSprites = new JSSpriteSheet("img/pipes.png");
  backgroundSprite = new JSSprite("img/background.png", 0, 0, 256, 256);
  playerSprite.loadP5Image(loadingSucess, loadingError);
  pipesSprites.loadP5Image(loadingSucess, loadingError);
  backgroundSprite.loadP5Image(loadingSucess, loadingError);
}

function setup() {
  var cv = createCanvas(300, 400);
  cv.parent("canvas");
  noSmooth();
  lastTime = (new Date()).getTime();
}

function draw() {
  var lastPipeX;
  var isOutOfBounds;

  fpm = frameRate() / 1000; // frames per milliseconds
  nowTime = (new Date()).getTime(); // milliseconds
  dt = nowTime - lastTime;
  dt *= fpm;
  lastTime = nowTime;

  clear();
  // background(128, 128, 255);
  backgroundSprite.drawP5Image(0, 0, 300, 400);

  bird.draw(playerSprite);
  pipes[0].draw(pipesSprites);
  pipes[1].draw(pipesSprites);
  lastPipeX = pipes[2].draw(pipesSprites);

  bird.update(dt)
  isOutOfBounds = pipes[0].update(bird, dt);
  pipes[1].update(bird, dt);
  pipes[2].update(bird, dt);

  if (isOutOfBounds) {
    var temp = pipes[0];
    pipes[0] = pipes[1];
    pipes[1] = pipes[2]
    pipes[2] = temp;

    // modify the last pipe
    pipes[2].x = lastPipeX + 200;
    pipes[2].height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
    pipes[2].scored = false;
  }

  if (speedUp === 10) {
    speedUp = 0;
    speed += 0.5;
  }
  // if (score % 5) {
  //   speedUp = false;
  // }
  fill(0);
  textSize(15);
  text("Score : " + score, 5, 20);
  text("High score : " + highScore, 5, 35);
  text("Speed : " + speed, 5, 50);
}

function keyTyped() {
  if (key === ' ') {
    bird.dy = flap;
  }
  return false;
}

function mousePressed() {
  bird.dy = flap;
  return false;
}

function touchStarted() {
  bird.dy = flap;
  return false;
}

function restartGame() {
  highScore = (highScore < score) ? score : highScore;
  score = 0;
  speed = 2;
  bird = new Bird();
  bird.sprite = playerSprite;
  pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
  var $pipe = 0;
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].x = $pipe + 350;
    $pipe += 200;
  }

}