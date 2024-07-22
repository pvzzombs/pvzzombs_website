function WorldLoader(){
  this.x = 0;
  this.y = 0;
  this.tileSize = 32;
  this.widthTilesCount = 20;
  this.heightTilesCount = 20;
}

WorldLoader.prototype = {
  draw: function(dx, dy) {
    var layers = TileMaps.rpg_map.layers;
    // console.log(layers[1].data);
    for (var row = 0; row < this.heightTilesCount; row++) {
      for (var col = 0; col < this.widthTilesCount; col++) {
        for (var l = 0; l < layers.length; l++) {
          var index = row * this.widthTilesCount + col;
          var x = col * this.tileSize + dx;
          var y = row * this.tileSize + dy;
          var tileType = layers[l].data[index];
          // console.log(index);
          // console.log(tileType);
          switch (tileType) {
            case 1:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                0, 0, 16, 16);
            break;
            case 44:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                112, 48, 16, 16);
            break;
            case 17:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                64, 16, 16, 16);
            break;
          }
          // draw player here
          switch (tileType) {
            case 5:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                64, 0, 16, 16);
            break;
          }
        }
      }
    }
    // noLoop();
  }
};

