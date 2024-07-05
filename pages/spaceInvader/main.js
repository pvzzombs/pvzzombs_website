//basically load all sprites using objects
var imagesLength = 5;
var currentImageLoadedLength = 0;
var back = {
  img: "img/galaxy.jpeg",
  loaded: null,
  x: 0,
  y: 0,
  width: 300,
  height: 400
}
var player = {
  img: "img/player.gif",
  loaded: null,
  x: 150,
  y: 350,
  width: 32,
  height: 32,
  cropHeight: 18,
  life: 3,
  maxLife: 3
}
var enemy = {
  img: "img/enemy.gif",
  loaded: false,
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
  loaded: false,
  x: player.x + 8,
  y: 345 - player.height,
  width: 16,
  height: 16
}
var bomb = {
  img: "img/bomb.png",
  loaded: false,
  x: enemy.x + 8,
  y: 15 + enemy.height,
  width: 16,
  height: 16
}
var score = 0;
var temp = 2;
var wait = 0;
var dt, now, last, pft;

function loadingText() {
  var loadingTextElement = document.getElementById("loadingText");
  if(loadingTextElement) {
    loadingTextElement.innerText = "Loaded " + (++currentImageLoadedLength) + "/" + imagesLength;
  }
}

function preload() {
  back.loaded = loadImage(back.img, loadingText)
  player.loaded = loadImage(player.img, loadingText);
  enemy.loaded = loadGif(enemy.img, loadingText);
  bullet.loaded = loadImage(bullet.img, loadingText);
  bomb.loaded = loadImage(bomb.img, loadingText);
}

function setup() {
  var cv = createCanvas(300, 400);
  cv.parent("canvas");
  last = (new Date()).getTime(); // milliseconds
}

function draw() {
  pft = frameRate() / 1000; // frames per milliseconds
  now = (new Date()).getTime(); // milliseconds
  dt = now - last;
  dt *= pft;
  last = now;

  //load images
  image(back.loaded, back.x, back.y, back.width, back.height, 0, 0, 183, 275);
  image(player.loaded, player.x, player.y, player.width, player.height, 0, 0, 264, 270);
  image(enemy.loaded, enemy.x, enemy.y, enemy.width, enemy.height, 0, 0, 400, 400);
  image(bullet.loaded, bullet.x, bullet.y);
  image(bomb.loaded, bomb.x, bomb.y);

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

function mouseClicked() {
  if (mouseX < player.x) {
    if (player.x > 0) player.x -= 30
  }
  if (mouseX > player.x) {
    if ((back.width - player.width) > player.x) player.x += 30
  }
}

function touchStarted() {
  if (mouseX < player.x) {
    if (player.x > 0) player.x -= 30
  }
  if (mouseX > player.x) {
    if ((back.width - player.width) > player.x) player.x += 30
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (player.x > 0) player.x -= 30
  } else if (keyCode === RIGHT_ARROW) {
    if ((back.width - player.width) > player.x) player.x += 30
  }
}

/*

Some links: 
https://erraticgenerator.com/blog/p5js-animate-with-deltatime/
https://stackoverflow.com/questions/13996267/loop-forever-and-provide-delta-time
https://stackoverflow.com/a/55028818

*/