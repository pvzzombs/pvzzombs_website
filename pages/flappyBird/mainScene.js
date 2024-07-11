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
    // console.log("Enetred game mode");
    lastTime = (new Date()).getTime();
  }
  this.draw = function () {
    // console.log(bird.gameOver);
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
      bird = new Bird();
      pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
      var pipeStartX = 0;
      for (var i = 0; i < pipes.length; i++) {
        pipes[i].x = pipeStartX + 350;
        pipeStartX += 200;
      }
      // console.log(true);
    }

    clear();
    // background(128, 128, 255);
    backgroundSprite.drawP5Image(0, 0, 300, 400);

    bird.draw(playerSprite);
    pipes[0].draw(pipesSprites);
    pipes[1].draw(pipesSprites);
    lastPipeX = pipes[2].draw(pipesSprites);

    bird.update(dt, pipes)
    isOutOfBounds = pipes[0].update(bird, dt, pipes);
    pipes[1].update(bird, dt, pipes);
    pipes[2].update(bird, dt, pipes);

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