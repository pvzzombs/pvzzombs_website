function Button(txt, x_, y_, w_, h_) {
  this.x = x_;
  this.y = y_;
  this.width = w_;
  this.height = h_;
  this.label = txt;
  this.defaultColor = color(100, 100, 255);
  this.hoverColor = color(150, 150, 255);
  this.textColor = color(0, 0, 0);
  this.active = false;
}

Button.prototype = {
  isMouseOver: function() {
    return (mouseX > this.x && mouseX < this.x + this.width &&
      mouseY > this.y && mouseY < this.y + this.height);
  },
  isTouchOver: function() {
    for (var i = 0; i < touches.length; i++) {
      var touch = touches[i];
      if (touch.x > this.x && touch.x < this.x + this.width &&
        touch.y > this.y && touch.y < this.y + this.height) {
          return true;
      }
    }
    return false;
  },
  draw: function() {
    if (this.isMouseOver() || this.isTouchOver) {
      fill(this.hoverColor);
    } else {
      fill(this.defaultColor);
    }
    rect(this.x, this.y, this.width, this.height, 10);
    var txtW = textWidth(this.label);
    var txtH = textAscent() / 2;
    var centerX = (this.x + this.width / 2) - (txtW / 2);
    var centerY = (this.y + this.height / 2) - (txtH / 2);
    textSize(16);
    fill(this.textColor);
    text(this.label, centerX, centerY);
  }
};