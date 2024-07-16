function Platform() {
  this.x = Math.floor(Math.random() * (300 - 0 + 1) + 0);
  this.y = Math.floor(Math.random() * (290 - 10 + 1) + 50);
  this.width = 100;
  this.height = 20;
  this.color = "green";
  this.passed = false;
}

Platform.prototype = {
  update: function() {
    var currentX = player.x + player.hitbox.x;
    var currentY = player.y + player.hitbox.y;
    if (currentY + player.hitbox.height <= this.y) {
      this.color = "yellow";
      this.passed = true;
    } else {
      this.color = "green";
      this.passed = false;
    }
    if (currentX + player.hitbox.width > this.x && currentX < this.x + this.width
      && currentY + player.hitbox.height + player.dy >= this.y && this.passed) {
        player.dy = 0;
        player.y = this.y - player.hitbox.height - player.hitbox.y;
        player.canJump = true;
    }
  },
  draw: function() {
    var len = this.width / this.height;
    var startX = 0;
    for (var i = 0; i < len; i++) {
      platformSprite.drawP5Image(this.x + startX, this.y, this.height, this.height);
      startX += this.height;
    }
    // fill(this.color);
    // rect(this.x, this.y, this.width, this.height);
  },
  drawDelta: function(dx , dy) {
    var len = this.width / this.height;
    var startX = 0;
    for (var i = 0; i < len; i++) {
      platformSprite.drawP5Image(this.x + startX + dx, this.y + dy, this.height, this.height);
      startX += this.height;
    }
    // fill(this.color);
    // rect(this.x, this.y, this.width, this.height);
  },
  drawXY: function(x, y) {
    fill(this.color);
    rect(x, y, this.width, this.height);
  }
};