function mainScene() {
  var bird;
  var pipes;
  this.setup = function () {
    bird = new Bird();
    pipesManager = new PipesManager();
    lastTime = (new Date()).getTime();
  }
  this.draw = function () {
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

    pipesManager.draw(pipesSprites);
    bird.draw(playerSprite);

    pipesManager.update(dt, bird);
    bird.update(dt, pipesManager)

    if (speedUp === 10) {
      speedUp = 0;
      speed += 0.5;
    }

    fill(0);
    textSize(15);
    text("Score : " + score, 5, 20);
    text("High score : " + highScore, 5, 35);
    text("Speed : " + speed, 5, 50);
    // fill(255);
    // rect((300 / 2) - (30 / 2), 0, 30, 50);
    push();
    textFont(mainFont);
    strokeWeight(6);
    stroke(0);
    fill(255);
    textSize(50);
    var scoreText = score.toString().padStart(2, "0");
    text(scoreText, (300 / 2) - (textWidth(scoreText) / 2), 50);
    pop();
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