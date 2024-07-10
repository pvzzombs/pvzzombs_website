//the bird
function Bird() {
  this.x = 50;
  this.y = 5;
  this.dx = 0;
  this.dy = 0;
  this.width = this.height = 50;
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
    bird.dy += gravity * dt;
    // bird.dy *= friction;
    // bird.dy *= dt;
    bird.y += bird.dy * dt;
    if (this.y + this.height >= 400) {
      restartGame();
    }
    if (this.y + this.height <= 0) {
      restartGame();
    }
  }
}