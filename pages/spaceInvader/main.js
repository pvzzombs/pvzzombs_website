//basically load all sprites using objects
var back = {
  img : "galaxy.jpeg",
  loaded : null,
  x: 0,
  y: 0,
  width: 300,
  height: 400
}
var player = {
  img : "player.gif",
  loaded : null,
  x: 150,
  y: 350,
  width: 32,
  height: 32,
  life: 20
}
var enemy = {
  img : "enemy.gif",
  loaded : false,
  x: 0,
  y: 25,
  width: 90,
  height: 90,
  life: 900
}
var bullet = {
  img : "bullet.png",
  loaded : false,
  x: player.x + 8,
  y: 345 - player.height,
  width: 16,
  height: 16
}
var bomb = {
  img : "bomb.png",
  loaded : false,
  x: enemy.x + 8,
  y: 15 + enemy.height,
  width: 16,
  height: 16
}
var score = 0;
var temp = 2;
var wait = 0;
function preload(){
  back.loaded = loadImage(back.img)
  player.loaded = loadImage(player.img);
  enemy.loaded = loadImage(enemy.img);
  bullet.loaded = loadImage(bullet.img);
  bomb.loaded = loadImage(bomb.img);
}
function setup(){
  var cv = createCanvas(300, 400);
  cv.parent("canvas");
}
function draw(){

  //load images
  image(back.loaded, back.x, back.y, back.width, back.height, 0, 0, 183, 275);
  image(player.loaded, player.x, player.y, player.width, player.height, 0, 0, 264, 270);
  image(enemy.loaded, enemy.x, enemy.y, enemy.width, enemy.height, 0, 0, 400, 400);
  image(bullet.loaded, bullet.x, bullet.y);
  image(bomb.loaded, bomb.x, bomb.y);
  
  //start the funny game
  //check if firecharges goes off the screen!!!
  if(bullet.y < 0){
    bullet.x = player.x + 8;
    bullet.y = 345 - player.height;
  }
  if(bomb.y > 400){
    bomb.x = enemy.x + 8;
    bomb.y = 15 + enemy.height;
  }
  
  //check the enemy moves
  if(enemy.x < 0){
    temp = 2;
  }
  if(enemy.x > back.width-enemy.width){
    temp = -2;
  }
  enemy.x += temp;
  //movement of firecharges!!!!!!
  bullet.y -= 30;
  bomb.y +=4;
  
  //detect collisions
  var hitEnemy = collideRectRect(bullet.x, bullet.y, bullet.width, bullet.height, enemy.x, enemy.y, enemy.width, enemy.height);
  var hitPlayer = collideRectRect(bomb.x, bomb.y, bomb.width, bomb.height, player.x, player.y, player.width, player.height);
  
  if(hitEnemy){
    bullet.x = player.x + 8;
    bullet.y = 345 - player.height;
    if(enemy.life > 0){
      enemy.life-=3;
    }else{
      fill("green");
      textSize(25);
      text("You win!", 60, 250);
      noLoop();
    }
  }
  if(hitPlayer){
    bomb.x = enemy.x + 8;
    bomb.y = 15 + enemy.height;
    if(player.life){
      player.life--;
    }else{
      fill("red");
      textSize(20);
      text("Game over", 60, 250);
      noLoop();
    }
  }
  //display lives using text
  fill(255);
  textSize(16);
  text("Enemy: " + enemy.life, 0,12);
  text("Player: " + player.life,0, 24);
  
  fill("green");
  rect(150,0,enemy.life*0.2, 10);
  fill("red");
  rect(150,11,player.life*2, 10);
}

function mouseClicked(){

  if(mouseX < player.x){
    if(player.x > 0) player.x -= 30
  }
  if(mouseX > player.x){
    if((back.width - player.width) > player.x) player.x += 30
  }
}