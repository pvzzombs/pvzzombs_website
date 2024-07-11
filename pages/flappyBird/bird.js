//the bird
function Bird() {
  this.x = 50;
  this.y = 5;
  this.dx = 0;
  this.dy = 0;
  this.width = this.height = 50;
  this.gameOver = false;
  this.hitbox = {
    x: 0,
    y: 3,
    width: 16 * 50 / 16,
    height: 14 * 50 / 16 /* I'm not sure the math here is correct */
  }
  this.draw = function (birdSprite) {
    // Box test
    // fill("red");
    // rect(this.x, this.y, this.width, this.height);
    // image(playerSprite, this.x, this.y);
    birdSprite.drawP5Image(this.x, this.y, this.width, this.height);

    // Hitbox
    // fill(255, 0, 0, 128);
    // rect(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height);
  }
  this.update = function (dt) {
    this.dy += gravity * dt;
    // bird.dy *= friction;
    // bird.dy *= dt;
    this.y += this.dy * dt;
    if (this.y + this.height >= 400 && !this.gameOver) {
      sfx_hit.play();
      this.dy = flap;
      // sfx_die.play();
      this.gameOver = true;
      currentScene = SCENE_DEATH;
      // debugger;
      // restartGame();
    }
    if (this.y + this.height <= 0 && !this.gameOver) {
      sfx_hit.play();
      this.dy = flap;
      // sfx_die.play();
      this.gameOver = true;
      currentScene = SCENE_DEATH;
      // debugger;
      // restartGame();
    }
  }
}