function Player() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.width = 24;
  this.height = 32;
}

Player.prototype = {
  draw: function(dx, dy) {
    var x = this.x + dx;
    var y = this.y + dy;
    playerSprite.drawP5Image(x, y, this.width, this.height, 0, 0, 96, 128);
  }
}