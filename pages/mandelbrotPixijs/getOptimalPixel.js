function mdbl(px, py, zm, panX, panY, scale) {
  for (py = 0; py < 400; py += scale) {
    //zoom factors
    x0 = panX + px / zm;
    y0 = panY + (py / zm);
    var x = 0;
    var y = 0;
    var i = 0;
    var xtemp;
    while (x * x + y * y <= 4 && i < 100) {
      xtemp = x * x - y * y + x0
      y = 2 * x * y + y0
      x = xtemp
      i = i + 1
    }
  }
}

function mandelbrotLargePixel(zm, panX, panY, largePixelSize) {
  //px - Canvas x
  //py - canvas y
  //x - real x
  //y - imaginary y
  var px, py, x, y;
  px = 0;

  var p = performance.now();
  while (px < 400) {
    mdbl(px, py, zm, panX, panY, largePixelSize);
    px += largePixelSize;
  }
  
  return performance.now() - p;
}

var ms = 1000;
var lp = 7;

while (ms > 5 && lp < 20) {
  ms = mandelbrotLargePixel(100, -2.5, -2.0, lp);
  lp++;
}

postMessage({
  pixelSize: lp,
  ms: ms
});

// mandelbrotLargePixel(100, -2.5, -2.0, 8);
