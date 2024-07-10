function Platform() {
  this.x = Math.floor(Math.random() * (300 - 0 + 1) + 0);
  this.y = Math.floor(Math.random() * (290 - 10 + 1) + 50);
  this.width = 100;
  this.height = 5;
  this.color = "green";
  this.passed = false;
}

Platform.prototype = {
  update: function() {
    if (player.y + player.height <= this.y) {
      this.color = "yellow";
      this.passed = true;
    } else {
      this.color = "green";
      this.passed = false;
    }
    if (player.x + player.width > this.x && player.x < this.x + this.width
      && player.y + player.height + player.dy >= this.y && this.passed) {
      player.dy = 0;
    }
  },
  draw: function() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
};