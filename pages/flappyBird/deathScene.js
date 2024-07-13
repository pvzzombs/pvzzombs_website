function deathScene() {
  var deadBird;
  var pipes;
  var startAgain;
  this.setup = function () {
    startAgain = false;
    deadBird = new Bird();
    deadBird.x = birdPos.x;
    deadBird.y = birdPos.y;
    deadBird.dy += flap;
    pipes = [new Pipe(), new Pipe(), new Pipe()];
    for (var i = 0; i < 3; i++) {
      pipes[i].x = pipesPos[i].x;
      pipes[i].y = pipesPos[i].y;
      pipes[i].height = pipesPos[i].height;
    }
    lastTime = (new Date()).getTime();
  }
  this.draw = function () {
    fpm = frameRate() / 1000; // frames per milliseconds
    nowTime = (new Date()).getTime(); // milliseconds
    dt = nowTime - lastTime;
    dt *= fpm;
    lastTime = nowTime;
    speed = 0;

    if (startAgain) {
      this.setup();
    }

    clear();
    backgroundSprite.drawP5Image(0, 0, 300, 400);

    pipes[0].draw(pipesSprites);
    pipes[1].draw(pipesSprites);
    pipes[2].draw(pipesSprites);
    deadBird.draw(playerSprite);

    deadBird.updateMove(dt)

    if (deadBird.y >= 400) {
      sfx_die.play();
      startAgain = true;
      // mgr.showScene(mainScene);
      mgr.showScene(tryAgainScene);
      return;
    }
  }
}