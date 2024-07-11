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
  this.update = function (bird, dt) {
    if (bird.gameOver) { return; }
    var isUpperCollided = collideRectRect(bird.x + bird.hitbox.x, bird.y + bird.hitbox.y, bird.hitbox.width, bird.hitbox.height, this.x, this.y, this.width, this.height);
    var isLowerCollided = collideRectRect(bird.x + bird.hitbox.x, bird.y + bird.hitbox.y, bird.hitbox.width, bird.hitbox.height, this.x, this.height + this.hole, this.width, 400 - this.height - this.hole);
    if (isUpperCollided || isLowerCollided) {
      sfx_hit.play();
      bird.dy = flap;
      // sfx_die.play();
      bird.gameOver = true;
      currentScene = SCENE_DEATH;
      // debugger;
      // restartGame();
    }
    if (bird.x > this.x + this.width && !this.scored) {
      score++;
      speedUp++;
      this.scored = true;
      sfx_point.play();
    }
    if (this.x + this.width <= 0) {
      // this.x = 550;
      // this.height = Math.floor(Math.random() * (200 - 50 + 1) + 50);
      // this.scored = false;
      return true;
    }
    this.x -= speed * dt;
    return false;
  }
}