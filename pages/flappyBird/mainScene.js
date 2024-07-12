function mainScene() {
  var bird;
  var pipes;
  this.setup = function () {
    bird = new Bird();
    pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
    var pipeStartX = 0;
    for (var i = 0; i < pipes.length; i++) {
      pipes[i].x = pipeStartX + 350;
      pipeStartX += 200;
    }
    lastTime = (new Date()).getTime();
  }
  this.draw = function () {
    var lastPipeX;
    var isOutOfBounds;

    fpm = frameRate() / 1000; // frames per milliseconds
    nowTime = (new Date()).getTime(); // milliseconds
    dt = nowTime - lastTime;
    dt *= fpm;
    lastTime = nowTime;

    if(bird.gameOver) {
      highScore = (highScore < score) ? score : highScore;
      score = 0;
      speed = 2;
      speedUp = 0;
      this.setup();
    }

    clear();

    backgroundSprite.drawP5Image(0, 0, 300, 400);

    bird.draw(playerSprite);
    for (var i = 0; i < pipes.length - 1; i++) {
      pipes[i].draw(pipesSprites);
    }
    lastPipeX = pipes[pipes.length - 1].draw(pipesSprites);

    bird.update(dt, pipes)
    isOutOfBounds = pipes[0].update(dt, bird, pipes);
    for (var i = 1; i < pipes.length; i++) {
      pipes[i].update(dt, bird, pipes);
    }

    if (isOutOfBounds) {
      var temp = pipes[0];
      for (var i = 1; i < pipes.length; i++) {
        pipes[i - 1] = pipes[i];
      }
      pipes[pipes.length - 1] = temp;

      // modify the last pipe
      pipes[pipes.length - 1].x = lastPipeX + 200;
      pipes[pipes.length - 1].height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
      pipes[pipes.length - 1].scored = false;
    }

    if (speedUp === 10) {
      speedUp = 0;
      speed += 0.5;
    }

    fill(0);
    textSize(15);
    text("Score : " + score, 5, 20);
    text("High score : " + highScore, 5, 35);
    text("Speed : " + speed, 5, 50);
  }

  this.keyTyped = function () {
    if (bird.gameOver) {
      return;
    }
    if (key === ' ') {
      bird.dy = flap;
      sfx_wing.play();
    }
    return false;
  }

  this.mousePressed = function () {
    if (bird.gameOver) {
      return;
    }
    bird.dy = flap;
    sfx_wing.play();
    return false;
  }

  this.touchStarted = function () {
    if (bird.gameOver) {
      return;
    }
    bird.dy = flap;
    sfx_wing.play();
    return false;
  }
}