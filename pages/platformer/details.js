function Details() {
  this.tileSize = 20;
  this.bushes = [];
  // var startX = 200;
  for (var i = 0; i < 20; i++) {
    var temp = random(-50, 100) * 20;
    console.log(temp);
    this.bushes.push({
      x: temp,
      y: worldHeight - this.tileSize
    })
    // startX += 100;
  }
  console.log(this);
}

Details.prototype = {
  drawDelta: function(dx, dy) {
    for (var i = 0; i < this.bushes.length; i++) {
      var item = this.bushes[i];
      worldSprite.drawP5Image(item.x + dx, item.y + dy, this.tileSize, this.tileSize, 96, 96, 16, 16);
    }
  }
}