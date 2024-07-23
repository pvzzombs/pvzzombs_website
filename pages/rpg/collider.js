function Collider() {
  this.arr = [];
}

Collider.prototype = {
  update: function() {
    for (var i = 0; i < this.arr.length; i++) {
      var obj = this.arr[i];
      var collided = collideRectRect(player.x + player.vx, player.y + player.vy, player.width, player.height,
        obj.x, obj.y, worldLoader.tileSize, worldLoader.tileSize);
        // console.log(collideRectRect);
        // noLoop();
      if (collided) {
        // if (player.x + player.width >= obj.x && player.vx > 0) {
        //   player.x = obj.x - player.width; 
        // } else if (player.x < obj.x + worldLoader.tileSize && player.vx < 0) {
        //   player.x = obj.x + worldLoader.tileSize;
        // } else if (player.y + player.height > obj.y && player.vy > 0) {
        //   player.y = obj.y - player.height;
        // } else if (player.y < obj.y + worldLoader.tileSize && player.vy < 0) {
        //   player.y = obj.y + worldLoader.tileSize
        // }
        if (player.vx != 0) {
          player.vx = 0;
        }
        if (player.vy != 0) {
          player.vy = 0;
        }
        return; 
      }
    }
  }
};