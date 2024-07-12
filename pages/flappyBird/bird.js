//the bird
function Bird() {
  this.x = 50;
  this.y = 5;
  this.dx = 0;
  this.dy = 0;
  this.width = this.height = 50;
  this.half = this.width / 2;
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
  this.updateMove = function(dt) {
    this.dy += gravity * dt;
    // bird.dy *= friction;
    // bird.dy *= dt;
    this.y += this.dy * dt;
  }
  this.update = function (dt, pipes) {
    this.dy += gravity * dt;
    // bird.dy *= friction;
    // bird.dy *= dt;
    this.y += this.dy * dt;

    if (this.gameOver) { return; }

    function passPositions(obj) {
      birdPos.x = obj.x;
      birdPos.y = obj.y;
      for(var i=0; i<3; i++) {
        pipesPos[i].x = pipes[i].x;
        pipesPos[i].y = pipes[i].y;
        pipesPos[i].height = pipes[i].height;
        // console.log(pipesPos[i].y);
      }
    }

    if (this.y + this.height >= 400) {
      sfx_hit.play();
      this.dy = flap;
      passPositions(this);
      this.gameOver = true;
      mgr.showScene(deathScene);
      return;
    }
    if (this.y + this.height <= 0) {
      sfx_hit.play();
      this.dy = flap;
      passPositions(this);
      this.gameOver = true;
      mgr.showScene(deathScene);
      return;
    }
  }
}