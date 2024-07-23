function Player() {
  this.x = 100;
  this.y = 40;
  this.vx = 0;
  this.vy = 0;
  this.width = 24;
  this.height = 32;
}

Player.prototype = {
  update: function() {
    this.x += this.vx;
    this.y += this.vy;
  },
  draw: function(dx, dy) {
    var x = this.x + dx;
    var y = this.y + dy;
    playerSprite.drawP5Image(x, y, this.width, this.height, 0, 0, 96, 128);
    // fill(255, 0, 0, 128);
    // rect(x, y, this.width, this.height);
  }
}