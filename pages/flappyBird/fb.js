//the onclick event

// window.onload = function(){
//   document.getElementsByTagName('canvas')[0].onclick = function(){
//     bird.dy = flap;
//     return false;
//   }
// }
//the world
var player;
var pipesSprites;
var backgroundSprite;
var gravity = 0.3;
var flap = -6;
var friction = 0.99;
var speed = 2;
var bird;
var pipes;
var score = 0;
var highScore = 0;
var speedUp = false;
//the bird
function Bird() {
	this.x = 50;
	this.y = 5;
	this.dx = 0;
	this.dy = 0;
	this.width = this.height = 50;
	this.draw = function (birdSprite) {
		// Box test
		// fill("red");
		// rect(this.x, this.y, this.width, this.height);
		// image(player, this.x, this.y);
		birdSprite.drawP5Image(this.x, this.y, this.width, this.height);
	}
	this.update = function () {
		bird.dy += gravity;
		bird.dy *= friction;
		bird.y += bird.dy;
		if (this.y + this.height >= 400) {
			restartGame();
		}
		if (this.y + this.height <= 0) {
			restartGame();
		}
	}
}
//the pipe
function Pipe() {
	this.scored = false;
	this.x = 0;
	this.y = 0;
	this.width = 50;
	this.height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
	this.hole = 150;
	this.draw = function (pipeSprite) {
		var higherPipeHeight = this.height;
		var lowerPipeHeight = 400 - this.height - this.hole;

		// box test
		// fill("green");
		// rect(this.x, this.y, this.width, higherPipeHeight);
		// rect(this.x, this.height + this.hole, this.width, lowerPipeHeight)

		/* 
		  Scale height to 80px (largest) from (200)
		*/
		pipeSprite.drawP5Image(this.x, this.y, this.width, higherPipeHeight,
			0, 80 - (higherPipeHeight * 80 / 200), 32, higherPipeHeight * 80 / 200);
		pipeSprite.drawP5Image(this.x, this.height + this.hole, this.width, lowerPipeHeight,
			0, 0, 32, lowerPipeHeight * 80 / 200);
		return this.x;
	}
	this.update = function (bird) {
		var isUpperCollided = collideRectRect(bird.x, bird.y, 50, 50, this.x, this.y, this.width, this.height);
		var isLowerCollided = collideRectRect(bird.x, bird.y, 50, 50, this.x, this.height + this.hole, this.width, 400 - this.height - this.hole);
		if (isUpperCollided || isLowerCollided) {
			restartGame();
		}
		if (bird.x > this.x + this.width && !this.scored) {
			score++;
			this.scored = true;
		}
		if (this.x + this.width <= 0) {
			// this.x = 550;
			// this.height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
			// this.scored = false;
			return true;
		} else {
			this.x -= speed;
		}
		return false;
	}
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
	player = new JSAnimatedSprite("img/bird.png", 4, 5, 16, 16);
	pipesSprites = new JSSpriteSheet("img/pipes.png");
	backgroundSprite = new JSSprite("img/background.png", 0, 0, 256, 256);
	player.loadP5Image();
	pipesSprites.loadP5Image();
	backgroundSprite.loadP5Image();
}

function setup() {
	var cv = createCanvas(300, 400);
	cv.parent("canvas");
	noSmooth();
}

function draw() {
	var lastPipeX;
	var isOutOfBounds;
	clear();
	// background(128, 128, 255);
	backgroundSprite.drawP5Image(0, 0, 300, 400);

	bird.draw(player);
	pipes[0].draw(pipesSprites);
	pipes[1].draw(pipesSprites);
	lastPipeX = pipes[2].draw(pipesSprites);

	bird.update()
	isOutOfBounds = pipes[0].update(bird);
	pipes[1].update(bird);
	pipes[2].update(bird);

	if (isOutOfBounds) {
		var temp = pipes[0];
		pipes[0] = pipes[1];
		pipes[1] = pipes[2]
		pipes[2] = temp;
		pipes[2].x = lastPipeX + 200;
		pipes[2].height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
		pipes[2].scored = false;
	}

	if (score % 10 === 0 && score !== 0 && !speedUp) {
		speed += 0.5;
		speedUp = true;
	}
	if (score % 5) {
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

function touchStarted() {
	bird.dy = flap;
	return false;
}

function restartGame() {
	highScore = (highScore < score) ? score : highScore;
	score = 0;
	speed = 2;
	bird = new Bird();
	bird.sprite = player;
	pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
	var $pipe = 0;
	for (var i = 0; i < pipes.length; i++) {
		pipes[i].x = $pipe + 350;
		$pipe += 200;
	}

}