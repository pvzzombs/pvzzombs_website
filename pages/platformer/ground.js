function Ground() {
  this.x = 0;
  this.y = 0;
  // this.width = 3000;
  // this.height = 1000;
  this.tileSize = 20;
  this.heightTileCount = 10;
  this.widthTileCount = 200;
}

Ground.prototype = {
  draw: function() {

  },
  drawDelta: function(dx, dy) {
    var startX = -1000;
    for (var w = 0; w < this.widthTileCount; w++) {
      var tempX = startX + w * this.tileSize + dx;
      var tempY = 360 + dy;
      var tempXW = tempX + this.tileSize;
      var tempYW = tempY + this.tileSize;
      if (tempXW > 0 && tempYW > 0 && tempX < worldWidth && tempY < worldHeight) {
        worldSprite.drawP5Image(tempX, tempY, this.tileSize, this.tileSize, 0, 0, 16, 16);
      }
    }
    startX = -1000;
    var depth = 360 + 20;
    for (var w = 0; w < this.widthTileCount; w++) {
      for (var h = 0; h < this.heightTileCount; h++) {
        var tempX = startX + dx;
        var tempY =  depth + h * this.tileSize + dy;
        var tempXW = tempX + this.tileSize;
        var tempYW = tempY + this.tileSize;
        if (tempXW > 0 && tempYW > 0 && tempX < worldWidth && tempY < worldHeight) {
          worldSprite.drawP5Image(tempX, tempY, this.tileSize, this.tileSize, 16, 0, 16, 16);
        }
      }
      startX += this.tileSize;
    }
  }
};