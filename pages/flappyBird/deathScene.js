function deathScene() {
  var deadBird;
  var pipes;
  var startAgain = true;
  this.setup = function () {
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
    // console.log("tred death");
    startAgain = false;
  }
  this.draw = function () {
    fpm = frameRate() / 1000; // frames per milliseconds
    nowTime = (new Date()).getTime(); // milliseconds
    dt = nowTime - lastTime;
    dt *= fpm;
    lastTime = nowTime;

    // console.log("From death " + pipesPos[0].y);
    speed = 0;

    if (startAgain) {
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
    }

    clear();
    backgroundSprite.drawP5Image(0, 0, 300, 400);

    pipes[0].draw(pipesSprites);
    pipes[1].draw(pipesSprites);
    pipes[2].draw(pipesSprites);
    deadBird.draw(playerSprite);

    deadBird.updateMove(dt)
    // pipes[0].update(bird, dt);
    // pipes[1].update(bird, dt);
    // pipes[2].update(bird, dt);

    if (deadBird.y >= 400) {
      sfx_die.play();
      // sfx_hit.stop();
      // highScore = (highScore < score) ? score : highScore;
      // score = 0;
      // speed = 2;
      // speedUp = 0;
      // bird = null;
      // pipes = null;
      startAgain = true;
      mgr.showScene(mainScene);
      return;
      // console.log("Main scene called");
      // mgr.showNextScene();
      // alert();
    }
  }

  // function restartGame() {
  //   sfx_hit.stop();
  //   highScore = (highScore < score) ? score : highScore;
  //   score = 0;
  //   speed = 2;
  //   speedUp = 0;
  //   bird = new Bird();
  //   pipes = [(new Pipe()), (new Pipe()), (new Pipe())];
  //   var pipeStartX = 0;
  //   for (var i = 0; i < pipes.length; i++) {
  //     pipes[i].x = pipeStartX + 350;
  //     pipeStartX += 200;
  //   }
  //   mgr.showScene(mainScene);
  // }
}