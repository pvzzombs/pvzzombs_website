function Player() {
  this.x = 295;
  this.y = 310;
  this.dx = 0;
  this.dy = 0;
  this.width = 34;
  this.height = 50;
  this.gravity = 1;
  this.canJump = true;
  this.currentSprite = null;
  this.hitbox = {
    x: 0,
    y: 0,
    width: this.width,
    height: this.height - 3
  }
}

Player.prototype = {
  update: function() {
    this.x += this.dx;
    this.y += this.dy;
    // console.log(this.y);
  },
  draw: function() {
    this.currentSprite.drawP5Image(this.x, this.y, this.width, this.height);
    // fill(255, 0, 0, 128);
    // rect(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height);
  },
  drawDelta: function(dx, dy) {
    this.currentSprite.drawP5Image(this.x + dx, this.y + dy, this.width, this.height);
    // fill(255, 0, 0, 128);
    // rect(this.x + this.hitbox.x + dx, this.y + this.hitbox.y + dy, this.hitbox.width, this.hitbox.height);
  },
  drawXY: function(x, y) {
    fill("red");
    rect(x, y, this.width, this.height);
  }
};