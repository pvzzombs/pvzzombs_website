function Ground() {
  this.x = 0;
  this.y = 0;
  this.width = 3000;
  this.height = 1000;
  this.tileSize = 20;
  this.heightTileCount = 4;
}

Ground.prototype = {
  draw: function() {

  },
  drawDelta: function(dx, dy) {
    var startX = -1000;
    for (var w = 0; w < this.width; w += this.tileSize) {
      worldSprite.drawP5Image(startX + dx, 360 + dy, this.tileSize, this.tileSize, 0, 0, 16, 16);
      startX += this.tileSize;
    }
    startX = -1000;
    var depth = 360 + 20;
    for (var w = 0; w < this.width; w += this.tileSize) {
      for (var h = 0; h < this.heightTileCount; h++) {
        worldSprite.drawP5Image(startX + dx, depth + h * this.tileSize + dy, this.tileSize, this.tileSize, 16, 0, 16, 16);
      }
      startX += this.tileSize;
    }
  }
};