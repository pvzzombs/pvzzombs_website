function Player() {
  this.x = 175;
  this.y = 250;
  this.dx = 0;
  this.dy = 0;
  this.width = 50;
  this.height = 50;
  this.gravity = 1;
}

Player.prototype = {
  update: function() {
    this.x += this.dx;
    this.y += this.dy;
    // console.log(this.y);
  },
  draw: function() {
    fill("red");
    rect(this.x, this.y, this.width, this.height);
  }
};