//the world
var gravity = 0.3;
var flap = -6;
var friction = 0.99;
var speed = 1;
var bird;
var pipes;
var score = 0;
var highScore = 0;
var speedUp = false;
//the bird
function Bird(){
	this.x = 50;
	this.y = 5;
	this.dx = 0;
	this.dy = 0;
	this.size = 50;
	this.draw = function(){
		fill("red");
		rect(this.x, this.y, 50, 50);
	};
	this.update = function(){
		bird.dy += gravity;
		bird.dy *= friction;
		bird.y += bird.dy;
		if(this.y + this.size >= 400){
			restartGame();
		}
		if(this.y + this.size <= 0){
			restartGame();
		}
	};
}
//the pipe
function Pipe(){
	this.scored = false;
	this.x = 0;
	this.y = 0;
	this.width = 50;
	this.height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
	this.hole = 150;
	this.draw = function(){
		fill("green");
		rect(this.x, this.y, this.width, this.height);
		rect(this.x, this.height+this.hole, this.width, 400 - this.height -this.hole);
	};
	this.update = function(){
		var isUpperCollided = collideRectRect(bird.x, bird.y, 50, 50, this.x, this.y, this.width, this.height);
		var isLowerCollided = collideRectRect(bird.x, bird.y, 50, 50, this.x, this.height+this.hole, this.width, 400 - this.height - this.hole);
		if(isUpperCollided || isLowerCollided){
			restartGame();
		}
		if(bird.x > this.x + this.width && !this.scored){
			score++;
			this.scored = true;
		}
		if(this.x+this.width<=0){
          this.x = 600;
		  this.height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
		  this.scored = false;
		}else{
		  this.x -= speed;
		}
	};
}
function setup(){
	createCanvas(300,400);
	bird = new Bird();
	pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
	var $pipe = 0;
	for(var i=0; i<pipes.length; i++){
		pipes[i].x = $pipe + 350;
		$pipe += 200;
	}
}
function draw(){
	clear();
	background(128,128,255);
	bird.draw()
    for(var i=0; i<pipes.length; i++){
		pipes[i].draw();
		pipes[i].update();
	}
	bird.update()
	if(score % 10 === 0 && score !== 0 && !speedUp){
		speed += 0.5;
		speedUp = true;
	}
	if(score % 5){
		speedUp = false;
	}
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
function restartGame(){
	highScore = (highScore < score) ? score : highScore;
	score = 0;
	speed = 1;
	bird = new Bird();
	pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
	var $pipe = 0;
	for(var i=0; i<pipes.length; i++){
		pipes[i].x = $pipe + 350;
		$pipe += 200;
	}
	
}