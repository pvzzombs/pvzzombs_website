function tryAgainScene() {
  var str1;
  var str5;
  var str2;
  var str3;
  var str4;
  var go;
  this.setup = function () {
    str1 = "Score: ";
    str5 = "Highscore: ";
    str2 = "Please tap";
    str3 = "or";
    str4 = "press space to restart";
    go = false;
    // console.log(str4Width);
    lastTime = (new Date()).getTime();
  }
  this.draw = function () {
    fpm = frameRate() / 1000; // frames per milliseconds
    nowTime = (new Date()).getTime(); // milliseconds
    dt = nowTime - lastTime;
    dt *= fpm;
    lastTime = nowTime;

    clear();
    backgroundSprite.drawP5Image(0, 0, 300, 400);

    highScore = score > highScore ? score : highScore;

    push();
    fill(0);
    textSize(20);
    noStroke();
    text(str1 + score, (300 / 2) - (textWidth(str1 + score) / 2), 50);
    text(str5 + highScore, (300 / 2) - (textWidth(str5 + highScore) / 2), 70);
    text(str2, (300 / 2) - (textWidth(str2) / 2), 90)
    text(str3, (300 / 2) - (textWidth(str3) / 2), 110);
    text(str4, (300 / 2) - (textWidth(str4) / 2), 130);
    pop();
  }
  this.keyTyped = function () {
    mgr.showScene(mainScene);
    return false;
  }

  this.mousePressed = function () {
    mgr.showScene(mainScene);
    return false;
  }

  this.touchStarted = function () {
    mgr.showScene(mainScene);
    return false;
  }
}