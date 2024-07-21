function PipesManager() {
  this.pipes = [];
  this.length = 3;
  var pipeStartX = 0;
  for (var i = 0; i < this.length; i++) {
    this.pipes[i] = new Pipe();
    this.pipes[i].x = pipeStartX + 350;
    pipeStartX += 200;
  }
}

PipesManager.prototype = {
  update: function (dt, bird) {
    var isOutOfBounds;
    for (var i = 0; i < this.length; i++) {
      if (i === 0) {
        isOutOfBounds = this.pipes[i].update(dt, bird);
      } else {
        this.pipes[i].update(dt, bird);
      }
      if (this.pipes[i].collided(bird)) {
        sfx_hit.play();
        birdPos.x = bird.x;
        birdPos.y = bird.y;
        bird.gameOver = true;
        mgr.showScene(deathScene);
        return;
      }
    }

    var lastPipeX = this.pipes[this.length - 1].x;

    if (isOutOfBounds) {
      var temp = this.pipes[0];
      for (var i = 1; i < this.length; i++) {
        this.pipes[i - 1] = this.pipes[i];
      }
      this.pipes[this.length - 1] = temp;

      // modify the last pipe
      this.pipes[this.length - 1].x = lastPipeX + 200;
      this.pipes[this.length - 1].height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
      this.pipes[this.length - 1].scored = false;
    }
  },
  draw: function (pipesSprites) {
    for (var i = 0; i < this.length; i++) {
      this.pipes[i].draw(pipesSprites);
    }
  }
};