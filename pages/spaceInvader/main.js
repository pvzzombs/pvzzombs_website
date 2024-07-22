//basically load all sprites using objects
var imagesLength = 5;
var currentImageLoadedLength = 0;

var back = {
  img: "img/galaxy.jpeg",
  spriteHandle: null,
  x: 0,
  y: 0,
  width: 300,
  height: 400
}
var player = {
  img: "img/player.png",
  spriteHandle: null,
  x: 150,
  y: 350,
  width: 32,
  height: 32,
  cropHeight: 18,
  life: 3,
  maxLife: 3
}
var enemy = {
  img: "img/enemy.png",
  spriteHandle: null,
  x: 0,
  y: 25,
  width: 90,
  height: 90,
  cropHeight: 45,
  life: 1000,
  maxLife: 1000
}
var bullet = {
  img: "img/bullet.png",
  spriteHandle: null,
  x: player.x + 8,
  y: 345 - player.height,
  width: 16,
  height: 16
}
var bomb = {
  img: "img/bomb.png",
  spriteHandle: null,
  x: enemy.x + 8,
  y: 15 + enemy.height,
  width: 16,
  height: 16
}

var score = 0;
var temp = 2;
var wait = 0;
var dt, now, last, fpm;
var shouldDisplay = false;

// sounds
// var shootSoundsArray;
var shootSounds;
// var enemyShootSoundsArray;
var enemyShootSounds;

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
//   back.loaded = loadImage(back.img, loadingText, loadingError);
//   player.loaded = loadImage(player.img, loadingText, loadingError);
//   enemy.loaded = loadGif(enemy.img, loadingText, loadingError);
//   bullet.loaded = loadImage(bullet.img, loadingText, loadingError);
//   bomb.loaded = loadImage(bomb.img, loadingText, loadingError);
  back.spriteHandle = new JSSprite(back.img, 0, 0, 183, 275);
  player.spriteHandle = new JSSprite(player.img, 0, 0, 264, 270);
  enemy.spriteHandle = new JSAnimatedSprite(enemy.img, 36, 5, 288, 348);
  bullet.spriteHandle = new JSSprite(bullet.img, 0, 0, 16, 16);
  bomb.spriteHandle = new JSSprite(bomb.img, 0, 0, 16, 16);

  back.spriteHandle.loadP5Image(loadingText, loadingError);
  player.spriteHandle.loadP5Image(loadingText, loadingError);
  enemy.spriteHandle.loadP5Image(loadingText, loadingError);
  bullet.spriteHandle.loadP5Image(loadingText, loadingError);
  bomb.spriteHandle.loadP5Image(loadingText, loadingError);

  // shootSoundsArray = [];
  shootSounds = [];
  enemyShootSounds = [];
  for (var i = 0; i < 5; i++) {
    // shootSoundsArray.push("sfx/laserRetro_00" + i + ".ogg");
    shootSounds.push(new Howl({
      src: ["sfx/laserRetro_00" + i + ".ogg"]
    }));
    enemyShootSounds.push(new Howl({
      src: ["sfx/impactMetal_00" + i + ".ogg"]
    }));
  }
  // for (var i = 0; )
}

p5.disableFriendlyErrors = true;

function setup() {
  var cv = createCanvas(300, 400);
  cv.parent("canvas");
  last = (new Date()).getTime(); // milliseconds
}

function draw() {
  // clear();
  // enemy.spriteHandle.drawP5Image(0, 0);
  mainGame();
}

function mainGame() {
  if (!shouldDisplay) {
    return;
  }

  fpm = frameRate() / 1000; // frames per milliseconds
  now = (new Date()).getTime(); // milliseconds
  dt = now - last;
  dt *= fpm;
  last = now;

  //load images
  back.spriteHandle.drawP5Image(back.x, back.y, back.width, back.height);
  player.spriteHandle.drawP5Image(player.x, player.y, player.width, player.height);
  enemy.spriteHandle.drawP5Image(enemy.x, enemy.y, enemy.width, enemy.height);
  bullet.spriteHandle.drawP5Image(bullet.x, bullet.y);
  bomb.spriteHandle.drawP5Image(bomb.x, bomb.y);

  //start the funny game
  //check if firecharges goes off the screen!!!
  if (bullet.y < 0) {
    bullet.x = player.x + 8;
    bullet.y = 345 - player.height;
  }
  if (bomb.y > 400) {
    bomb.x = enemy.x + 8;
    bomb.y = 15 + enemy.height;
  }

  //check the enemy moves
  if (enemy.x < 0) {
    temp = 2;
  }
  if (enemy.x > back.width - enemy.width) {
    temp = -2;
  }

  // movement
  enemy.x += temp * dt;
  //movement of firecharges!!!!!!
  bullet.y -= 10 * dt;
  bomb.y += 4 * dt;

  //detect collisions
  var hitEnemy = collideRectRect(bullet.x, bullet.y, bullet.width, bullet.height, enemy.x, enemy.y, enemy.width, enemy.cropHeight);
  var hitPlayer = collideRectRect(bomb.x, bomb.y, bomb.width, bomb.height, player.x, player.y, player.width, player.cropHeight);

  if (hitEnemy) {
    // image(bullet.loaded, bullet.x, enemy.y+enemy.height - 10);
    shootSounds[floor(random(0, 5))].play();
    bullet.x = player.x + 8;
    bullet.y = 345 - player.height;
    if (enemy.life > 0) {
      enemy.life -= 5;
    }
    if (enemy.life === 0) {
      fill("green");
      textSize(25);
      text("You win!", 60, 250);
      noLoop();
    }
  }
  if (hitPlayer) {
    enemyShootSounds[floor(random(0, 5))].play();
    bomb.x = enemy.x + 8;
    bomb.y = 15 + enemy.height;
    if (player.life > 0) {
      player.life--;
    }
    if (player.life === 0) {
      fill("red");
      textSize(20);
      text("Game over", 60, 250);
      noLoop();
    }
  }
  //display lives using text
  fill(255);
  textSize(16);
  text("Enemy: " + enemy.life, 0, 12);
  text("Player: " + player.life, 0, 24);

  fill("red");
  rect(200, 0, enemy.life / enemy.maxLife * 100, 10);
  fill("green");
  rect(200, 11, player.life / player.maxLife * 100, 10);
}

function mousePressed() {
  // console.log("Mouse");
  if (mouseX < 150) {
    if (player.x > 0) player.x -= 30
  }
  if (mouseX >= 150) {
    if ((back.width - player.width) > player.x) player.x += 30
  }
  // return false;
}

function touchStarted() {
  // console.log("Tap");
  var touch = touches[0];
  if (touch.x < 150) {
    if (player.x > 0) player.x -= 30
  }
  if (touch.x >= 150) {
    if ((back.width - player.width) > player.x) player.x += 30
  }
  // return false;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || key === "A" || key === "a") {
    if (player.x > 0) player.x -= 30
  } else if (keyCode === RIGHT_ARROW || key === "D" || key === "d") {
    if ((back.width - player.width) > player.x) player.x += 30
  }
  // return false;
}

/*

Some links: 
https://erraticgenerator.com/blog/p5js-animate-with-deltatime/
https://stackoverflow.com/questions/13996267/loop-forever-and-provide-delta-time
https://stackoverflow.com/a/55028818

*/