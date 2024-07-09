function JSSprite(stringName, intSourceX, intSourceY, intSourceWidth, intSourceHeight) {
  this.imageHandle = null;
  this.name = stringName;
  this.sourceX = intSourceX;
  this.sourceY = intSourceY;
  this.sourceWidth = intSourceWidth;
  this.sourceHeight = intSourceHeight;
}

JSSprite.prototype = {
  loadP5Image: function (functionSuccessCallback, functionFailCallback) {
    this.imageHandle = loadImage(this.name, functionSuccessCallback, functionFailCallback);
  },
  drawP5Image: function (intDestX, intDestY, intDestWidth, intDestHeight) {
    if (typeof intDestWidth != "undefined" && typeof intDestHeight != "undefined") {
      image(this.imageHandle, intDestX, intDestY, intDestWidth, intDestHeight,
        this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight);
      return;
    }
    image(this.imageHandle, intDestX, intDestY, this.sourceWidth, this.sourceHeight,
      this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight);
  }
};

function JSAnimatedSprite(stringName, intFrameCount, intTick, intSourceWidth, intSourceHeight) {
  this.imageHandle = null;
  this.name = stringName;
  this.frameCount = intFrameCount;
  this.tick = intTick;
  // this.sourceX = intSourceX;
  // this.sourceY = intSourceY;
  this.sourceWidth = intSourceWidth;
  this.sourceHeight = intSourceHeight;

  // internal
  this.currentFrame = 0;
  this.moveFrameCount = 0;
}

JSAnimatedSprite.prototype = {
  loadP5Image: function (functionSuccessCallback, functionFailCallback) {
    this.imageHandle = loadImage(this.name, functionSuccessCallback, functionFailCallback);
  },
  drawP5Image: function (intDestX, intDestY, intDestWidth, intDestHeight) {
    var width = this.sourceWidth;
    var height = this.sourceHeight;
    if (typeof intDestWidth !== "undefined" && typeof intDestHeight !== "undefined") {
      width = intDestWidth;
      height = intDestHeight;
    }
    // image.noSmooth();
    image(this.imageHandle, intDestX, intDestY, width, height,
      this.currentFrame * this.sourceWidth, 0, this.sourceWidth, this.sourceHeight);

    this.moveFrameCount = this.moveFrameCount + 1;
    // console.log(this.moveFrameCount);
    if (this.moveFrameCount === this.tick) {
      this.moveFrameCount = 0;
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    }
  }
};

function JSSpriteSheet(stringName) {
  this.imageHandle = null;
  this.name = stringName;
}

JSSpriteSheet.prototype = {
  loadP5Image: function (functionSuccessCallback, functionFailCallback) {
    this.imageHandle = loadImage(this.name, functionSuccessCallback, functionFailCallback);
  },
  drawP5Image: function (intDestX, intDestY, intDestWidth, intDestHeight,
    intSourceX, intSourceY, intSourceWidth, intSourceHeight) {
    image(this.imageHandle, intDestX, intDestY, intDestWidth, intDestHeight,
      intSourceX, intSourceY, intSourceWidth, intSourceHeight);
  }
};