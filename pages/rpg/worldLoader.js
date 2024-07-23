function WorldLoader(){
  this.x = 0;
  this.y = 0;
  this.tileSize = 32;
  this.widthTilesCount = 20;
  this.heightTilesCount = 20;
  this.arr = [];
}

WorldLoader.prototype = {
  setup: function() {
    var layers = TileMaps.rpg_map.layers;
    for (var row = 0; row < this.heightTilesCount; row++) {
      for (var col = 0; col < this.widthTilesCount; col++) {
        for (var l = 0; l < layers.length; l++) {
          var index = row * this.widthTilesCount + col;
          var x = col * this.tileSize;
          var y = row * this.tileSize;
          var tileType = layers[l].data[index];
          switch (tileType) {
            // trunk
            case 17:
              collider.arr.push({
                x: x,
                y: y,
                type: 17
              })
            break;
            // fences
            case 45:
              collider.arr.push({
                x: x,
                y: y,
                type: 45
              });
            break;
            case 47:
              collider.arr.push({
                x: x,
                y: y,
                type: 47
              });
            break;
            case 69:
              collider.arr.push({
                x: x,
                y: y,
                type: 69
              });
            break;
            case 71:
              collider.arr.push({
                x: x,
                y: y,
                type: 71
              });
            break;
            case 46:
              collider.arr.push({
                x: x,
                y: y,
                type: 46
              });
            break;
            case 57:
              collider.arr.push({
                x: x,
                y: y,
                type: 57
              });
            break;
            case 59:
              collider.arr.push({
                x: x,
                y: y,
                type: 59
              });
            break;
          }
        }
      }
    }
  },
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
            // trunk
            case 17:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                64, 16, 16, 16);
            break;
            // fences
            case 45:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                128, 48, 16, 16);
            break;
            case 47:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                160, 48, 16, 16);
            break;
            case 69:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                128, 80, 16, 16);
            break;
            case 71:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                160, 80, 16, 16);
            break;
            case 46:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                144, 48, 16, 16);
            break;
            case 57:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                128, 64, 16, 16);
            break;
            case 59:
              tileMapSprite.drawP5Image(x, y, this.tileSize, this.tileSize,
                160, 64, 16, 16);
            break;
          }
        }
      }
    }

    player.draw(dx, dy);

    for (var row = 0; row < this.heightTilesCount; row++) {
      for (var col = 0; col < this.widthTilesCount; col++) {
        for (var l = 0; l < layers.length; l++) {
          var index = row * this.widthTilesCount + col;
          var x = col * this.tileSize + dx;
          var y = row * this.tileSize + dy;
          var tileType = layers[l].data[index];
          // draw player here
          switch (tileType) {
            // leaves
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

