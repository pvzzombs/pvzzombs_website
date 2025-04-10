(async function () {
  /* global PIXI, Swal, Rainbow */
  //Create the canvas, then collect the height and width
  var canvasWidth = 400,
    canvasHeight = 400,
    rect;
  //flag to tell whether to use setInterval or not
  var useInterval = true;
  //flip imaginary axis (-1 means true, 1 is default)
  var flipImaginaryAxis = 1;
  //Sizes of pixel
  var pixelSizes = [8, 5, 1];
  //Largest pixel size
  var largePixelSize = 15;
  //Use to store setTimeout IDs for calling mandelbrot();
  var mandelbrotCalls = new Array(pixelSizes.length);
  //Store setInterval IDs
  var drawColumnIDs = new Array(pixelSizes.length);

  var bufferArray = new Array(pixelSizes.length);
  var bufferLargePixel;

  var particleContainerArray = new Array(pixelSizes.length);
  var particleContainerLargePixel;

  var isLoaded = false;

  var thread = null;

  var useBuffer = false;
  //to prevent error during loading, make sure that
  //the canvas is loaded first before calling any methods
  // canvas = document.getElementById("paper");
  var canvasWrapper = document.getElementById("canvasWrapper");

  const app = new PIXI.Application({
    width: canvasWrapper.clientWidth,
    height: canvasWrapper.clientWidth,
  });
  app.stage.interactive = true;
  canvasWrapper.appendChild(app.view);

  canvasWidth = canvasWrapper.clientWidth;
  canvasHeight = canvasWidth;
  var j;
  if (useBuffer) {
    bufferLargePixel = new PIXI.Graphics();
    app.stage.addChild(bufferLargePixel);
  
    for (j = 0; j < pixelSizes.length; j++) {
      bufferArray[j] = new PIXI.Graphics();
      app.stage.addChild(bufferArray[j]);
    }
  } else {
    particleContainerLargePixel = new PIXI.ParticleContainer(Math.ceil(canvasWidth / largePixelSize) * Math.ceil(canvasHeight / largePixelSize));
    app.stage.addChild(particleContainerLargePixel);

    for (j = 0; j < pixelSizes.length; j++) {
      particleContainerArray[j] = new PIXI.ParticleContainer(Math.ceil(canvasWidth / pixelSizes[j]) * Math.ceil(canvasHeight / pixelSizes[j]));
      app.stage.addChild(particleContainerArray[j]);
    }
  }


  var isDragging = false;
  var oldX, oldY;
  var newX, newY;
  var adjX = 0,
    adjY = 0;
  var pinchInitial;
  var tempZooms = zooms;
  var tempPanX = panX,
    tempPanY = panY;

  //in the instance, create all thngs
  //pan is the length of scroll
  //zooms is the current number of zoom
  //panX is the upper left Corner
  //panY is the bottom left Corner
  //zf is the increase factor in the zoom
  //maxI is the total number of iteration
  //per complex number
  //create pallete to color mandelbrot by
  //using rainbowvis.js
  var pan,
    zooms,
    panX,
    panY,
    zf,
    maxI = 50,
    coloringType;
  //pallete for escapeTime
  var pallete = new Rainbow();
  pallete.setSpectrum("#000764", "#206bcb", "#edffff", "#ffaa00", "#000200");
  pallete.setNumberRange(0, maxI);
  //pallete for smoothColoring
  var _pallete = ["#000764", "#206bcb", "#edffff", "#ffaa00", "#000200"];

  app.view.onmousedown = function (e) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    rect = app.view.getBoundingClientRect();
    isDragging = true;
    oldX = e.clientX - rect.left;
    oldY = e.clientY - rect.top;
    tempZooms = zooms;
    tempPanX = panX;
    tempPanY = panY;
    abortRun();
  };

  app.view.onmousemove = function (e) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    if (!isDragging) {
      return;
    }
    rect = app.view.getBoundingClientRect();
    newX = e.clientX - rect.left;
    newY = e.clientY - rect.top;

    var p1x = panX + oldX / zooms;
    var p1y = panY + flipImaginaryAxis * (oldY / zooms);

    var p2x = panX + newX / zooms;
    var p2y = panY + flipImaginaryAxis * (newY / zooms);

    adjX = p2x - p1x;
    adjY = p2y - p1y;

    mandelbrotLargePixel(tempZooms, tempPanX - adjX, tempPanY - adjY);
  };

  app.view.onmouseup = function (e) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    isDragging = false;
    panX = tempPanX;
    panY = tempPanY;
    panX -= adjX;
    panY -= adjY;
    zooms = tempZooms;
    pan = panX + 2 / zooms - (panX - 1 / zooms);
    adjX = 0;
    adjY = 0;

    // mandelbrotLargePixel(zooms, panX, panY);
    drawOnTouch(e);
  };

  app.view.onmouseleave = function (e) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    if (isDragging) {
      isDragging = false;
      panX = tempPanX;
      panY = tempPanY;
      panX -= adjX;
      panY -= adjY;
      zooms = tempZooms;
      pan = panX + 2 / zooms - (panX - 1 / zooms);
      adjX = 0;
      adjY = 0;
      // mandelbrotLargePixel(zooms, panX, panY);
      drawOnTouch(e);
    }
  };

  app.view.onwheel = function (e) {
    abortRun();
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    const scrollValue = e.deltaY;
    // console.log(scrollValue)
    var mx = panX + canvasWidth / 2 / zooms;
    var my = panY + flipImaginaryAxis * (canvasHeight / 2 / zooms);
    if (scrollValue > 0) {
      // zoom out
      zooms /= zf;
    } else if (scrollValue < 0) {
      // zoom in
      zooms *= zf;
    }
    panX = mx - canvasWidth / 2 / zooms;
    panY = my - flipImaginaryAxis * (canvasHeight / 2 / zooms);
    mandelbrotLargePixel(zooms, panX, panY);
    drawOnTouch(e);
  };

  function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  app.view.ontouchstart = function (e) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    rect = app.view.getBoundingClientRect();
    if (e.touches.length === 1) {
      isDragging = true;
      const touch = e.touches[0];
      oldX = touch.clientX - rect.left;
      oldY = touch.clientY - rect.top;
    } else if (e.touches.length === 2) {
      pinchInitial = getDistance(e.touches);
    }
    tempZooms = zooms;
    tempPanX = panX;
    tempPanY = panY;
    abortRun();
  };

  app.view.ontouchmove = function (e) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    rect = app.view.getBoundingClientRect();

    if (e.touches.length === 2) {
      var pinchCurrent = getDistance(e.touches);
      var mx = tempPanX + canvasWidth / 2 / tempZooms;
      var my = tempPanY + flipImaginaryAxis * (canvasHeight / 2 / tempZooms);
      // if (pinchCurrent > pinchInitial) {
      //   tempZooms *= 1.1;
      // } else {
      //   tempZooms /= 1.1;
      // }
      tempZooms *= pinchCurrent / pinchInitial;
      tempPanX = mx - canvasWidth / 2 / tempZooms;
      tempPanY = my - flipImaginaryAxis * (canvasHeight / 2 / tempZooms);
    } else if (e.touches.length === 1) {
      if (!isDragging) {
        return;
      }
      const touch = e.touches[0];
      newX = touch.clientX - rect.left;
      newY = touch.clientY - rect.top;

      var p1x = panX + oldX / zooms;
      var p1y = panY + flipImaginaryAxis * (oldY / zooms);

      var p2x = panX + newX / zooms;
      var p2y = panY + flipImaginaryAxis * (newY / zooms);

      adjX = p2x - p1x;
      adjY = p2y - p1y;
    }
    // alert();
    mandelbrotLargePixel(tempZooms, tempPanX - adjX, tempPanY - adjY);
  };

  app.view.ontouchend = function (e) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    isDragging = false;
    panX = tempPanX;
    panY = tempPanY;
    panX -= adjX;
    panY -= adjY;
    zooms = tempZooms;
    pan = panX + 2 / zooms - (panX - 1 / zooms);
    adjX = 0;
    adjY = 0;

    // mandelbrotLargePixel(zooms, panX, panY);
    drawOnTouch(e);
  };

  //changes the mandelbrot set based on mouse clicks
  function drawOnTouch() {
    document.getElementById("xa").value = panX;
    document.getElementById("ya").value = panY;
    document.getElementById("za").value = zooms;
    pallete.setNumberRange(0, maxI);

    show();
    abortRun();
    startRun();
  }

  //aborts startRun
  function abortRun() {
    var i;
    for (i = 0; i < mandelbrotCalls.length; i++) {
      clearTimeout(mandelbrotCalls[i]);
    }
    if (useInterval) {
      for (i = 0; i < drawColumnIDs.length; i++) {
        clearInterval(drawColumnIDs[i]);
      }
    } else {
      for (i = 0; i < drawColumnIDs.length; i++) {
        cancelAnimationFrame(drawColumnIDs[i]);
      }
    }
    var j;
    if (useBuffer) {
      for (j = 0; j < pixelSizes.length; j++) {
        bufferArray[j].clear();
      }
    } else {
      for (j = 0; j < pixelSizes.length; j++) {
        // console.log("Particle array ", j, " has ", particleContainerArray[j].children.length, " children.");
        app.stage.removeChild(particleContainerArray[j]);
        particleContainerArray[j].destroy({ children: true });
        particleContainerArray[j] = new PIXI.ParticleContainer(Math.ceil(canvasWidth / pixelSizes[j]) * Math.ceil(canvasHeight / pixelSizes[j]));
        app.stage.addChild(particleContainerArray[j]);
      }
      reorderParticleContainers();
    }
  }
  //starts calling mandelbrot
  function startRun() {
    mandelbrotLargePixel(zooms, panX, panY);
    function mandelbrotCallFactory(i) {
      return function () {
        mandelbrot(zooms, panX, panY, pixelSizes[i], i);
        // console.log(panX, panY);
      };
    }
    for (var i = 0; i < pixelSizes.length; i++) {
      mandelbrotCalls[i] = setTimeout(mandelbrotCallFactory(i));
      //console.log(i);
    }
  }

  function reorderParticleContainers() {
    // remove first
    app.stage.removeChild(particleContainerLargePixel);
    for (j = 0; j < pixelSizes.length; j++) {
      app.stage.removeChild(particleContainerArray[j]);
    }
    // add again
    app.stage.addChild(particleContainerLargePixel);
    for (j = 0; j < pixelSizes.length; j++) {
      app.stage.addChild(particleContainerArray[j]);
    }
  }

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------

  function mdbl(px, zm, panX, panY, scale, func, arrayIndex) {
    var py;
    for (py = 0; py < canvasHeight; py += scale) {
      //zoom factors
      var x0 = panX + px / zm;
      var y0 = panY + flipImaginaryAxis * (py / zm);
      var x = 0;
      var y = 0;
      var i = 0;
      var xtemp;
      while (x * x + y * y <= 4 && i < maxI) {
        xtemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xtemp;
        i = i + 1;
      }
      //coloring
      func(px, py, x, y, i, scale, arrayIndex);
    }
  }

  function mandelbrot(zm, panX, panY, scale, arrayIndex) {
    // scale = scale || 1;
    //px - Canvas x
    //py - canvas y
    //x - real x
    //y - imaginary y
    var px;
    px = 0;
    if (useInterval) {
      // var p = performance.now();
      drawColumnIDs[arrayIndex] = setInterval(function () {
        if (px < canvasWidth) {
          mdbl(px, zm, panX, panY, scale, coloringMethod, arrayIndex);
          px += scale;
          // if (scale === 1) {
          //   document.getElementById("progress").innerText = (px / canvasWidth * 100);
          // }
        } else {
          // console.log(performance.now() - p);
          clearInterval(drawColumnIDs[arrayIndex]);
          // bufferLargePixel.clear();
        }
      });
    } else {
      function drawStep() {
        if (px < canvasWidth) {
          mdbl(px, zm, panX, panY, scale, coloringMethod, arrayIndex);
          px += scale;
          drawColumnIDs[arrayIndex] = requestAnimationFrame(drawStep);
        } else {
          cancelAnimationFrame(drawColumnIDs[arrayIndex]);
          // bufferLargePixel.clear();
        }
      }
      drawColumnIDs[arrayIndex] = requestAnimationFrame(drawStep);
    }
  }

  function mandelbrotLargePixel(zm, panX, panY) {
    //px - Canvas x
    //py - canvas y
    //x - real x
    //y - imaginary y
    if (useBuffer) {
      bufferLargePixel.clear();
    } else {
      app.stage.removeChild(particleContainerLargePixel);
      particleContainerLargePixel.destroy({ children: true });
      particleContainerLargePixel = new PIXI.ParticleContainer(Math.ceil(canvasWidth / largePixelSize) * Math.ceil(canvasHeight / largePixelSize));
      app.stage.addChild(particleContainerLargePixel);
      reorderParticleContainers();
    }
    var px;
    px = 0;
    while (px < canvasWidth) {
      mdbl(px, zm, panX, panY, largePixelSize, coloringMethod, null);
      px += largePixelSize;
    }
  }

  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // ------------------------------------------------------------

  function extractColorToNumber(str) {
    if (str.startsWith("#")) {
      return parseInt(str.substr(1, 6), 16);
    } else if (str.startsWith("rgb")) {
      //  r g b (  )
      var num = 0;
      var exp = 2;
      var tempNum = "";
      for (j = 4; j < str.length; j++) {
        if (str[j] >= '0' && str[j] <= '9') {
          tempNum += str[j];
        } else {
          num += parseInt(tempNum) * (256 ** exp);
          tempNum = "";
          exp = exp - 1;
        }
      }
      return num;
    } else {
      return 0;
    }
  }

  function coloringMethod(px, py, x, y, i, scale, arrayIndex) {
    // console.log(true);
    var buffer = null;
    var particleContainer = null;
    if (useBuffer) {
      if (arrayIndex === null) {
        buffer = bufferLargePixel;
      } else {
        buffer = bufferArray[arrayIndex];
      }
    } else {
      if (arrayIndex === null) {
        particleContainer = particleContainerLargePixel;
      } else {
        particleContainer = particleContainerArray[arrayIndex];
      }
    }
    var r;
    if ("smoothColoring" === coloringType) {
      if (i < maxI) {
        var log_zn = Math.log(x * x + y * y) / 2;
        var nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
        i = i + 1 - nu;
        if (useBuffer) {
          buffer.beginFill(color((i / maxI) * (_pallete.length - 1)));
          buffer.drawRect(px, py, scale, scale);
          buffer.endFill();
        } else {
          r = new PIXI.Sprite(PIXI.Texture.WHITE);
          r.tint = extractColorToNumber(color((i / maxI) * (_pallete.length - 1)));
          r.width = scale;
          r.height = scale;
          r.position.set(px, py);
          particleContainer.addChild(r);
        }
      } else {
        if (useBuffer) {
          buffer.beginFill("#000000");
          buffer.drawRect(px, py, scale, scale);
          buffer.endFill();
        } else {
          r = new PIXI.Sprite(PIXI.Texture.WHITE);
          r.tint = 0;
          r.width = scale;
          r.height = scale;
          r.position.set(px, py);
          particleContainer.addChild(r);
        }
      }
    } else {
      if (useBuffer) {
        buffer.beginFill(color(i));
        buffer.drawRect(px, py, scale, scale);
        buffer.endFill();
      } else {
        r = new PIXI.Sprite(PIXI.Texture.WHITE);
        r.tint = extractColorToNumber(color(i));
        r.width = scale;
        r.height = scale;
        r.position.set(px, py);
        particleContainer.addChild(r);
      }
    }
    // console.log(1);
    // app.render();
  }

  function color(num) {
    var selection;
    switch (coloringType) {
      case "escapeTime":
        selection = pallete.colourAt(num);
        return "#" + selection;
      case "smoothColoring":
        return interpolation(num);
      default:
        selection = pallete.colourAt(num);
        return "#" + selection;
    }
  }

  function hexToRGBObject(hex) {
    hex = (hex + "").replace("#", "");
    return {
      r: parseInt(hex.charAt(0) + hex.charAt(1), 16),
      g: parseInt(hex.charAt(2) + hex.charAt(3), 16),
      b: parseInt(hex.charAt(4) + hex.charAt(5), 16),
    };
  }

  function linear_interpolate(color1, color2, ratio) {
    var r = Math.floor((color2.r - color1.r) * ratio + color1.r);
    var g = Math.floor((color2.g - color1.g) * ratio + color1.g);
    var b = Math.floor((color2.b - color1.b) * ratio + color1.b);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function interpolation(iteration) {
    var color1 = hexToRGBObject(_pallete[Math.floor(iteration)]);
    var color2 = hexToRGBObject(_pallete[Math.floor(iteration) + 1]);
    return linear_interpolate(color1, color2, iteration % 1);
  }
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  //reset
  function work() {
    if (!isLoaded) {
      return;
    }
    flipImaginaryAxis = 1;
    pan = 0.1;
    zooms = canvasWidth / 4;
    panX = -2.5;
    panY = -2.0 * flipImaginaryAxis;
    zf = 1.1;
    maxI = 50;
    pallete.setSpectrum("#000764", "#206bcb", "#edffff", "#ffaa00", "#000200");
    pallete.setNumberRange(0, maxI);
    _pallete = ["#000764", "#206bcb", "#edffff", "#ffaa00", "#000200"];
    coloringType = "smoothColoring";
    document.getElementById(coloringType).checked = true;
    document.getElementById("flipImaginaryAxis").checked = true;
    document.getElementById("xa").value = panX;
    document.getElementById("ya").value = panY;
    document.getElementById("za").value = zooms;
    show();
    abortRun();
    // mandelbrotLargePixel(zooms, panX, panY);
    startRun();
  }
  //reset coordinates
  function resetCoordinates() {
    if (!isLoaded) {
      return;
    }
    pan = 0.1;
    zooms = canvasWidth / 4;
    panX = -2.5;
    panY = -2.0 * flipImaginaryAxis;
    document.getElementById("xa").value = panX;
    document.getElementById("ya").value = panY;
    document.getElementById("za").value = zooms;
    show();
    abortRun();
    // mandelbrotLargePixel(zooms, panX, panY);
    startRun();
  }
  //flip imaginary axis
  function flipImagAxis() {
    if (!isLoaded) {
      return;
    }
    flipImaginaryAxis = flipImaginaryAxis == 1 ? -1 : 1;
    panY = panY * -1;
    document.getElementById("ya").value = panY;
    show();
    abortRun();
    // mandelbrotLargePixel(zooms, panX, panY);
    startRun();
  }
  //left to right scroll adjustment
  function xScroll(n) {
    if (!isLoaded) {
      return;
    }
    var temp = n
      ? parseFloat(document.getElementById("xa").value) + pan
      : parseFloat(document.getElementById("xa").value) - pan;
    document.getElementById("xa").value = temp;
    panX = temp;
    show();
    abortRun();
    startRun();
  }
  //top to bottom scroll adjustment
  function yScroll(n) {
    if (!isLoaded) {
      return;
    }
    var temp = n
      ? parseFloat(document.getElementById("ya").value) + pan
      : parseFloat(document.getElementById("ya").value) - pan;
    document.getElementById("ya").value = temp;
    panY = temp;
    show();
    abortRun();
    startRun();
  }
  //draw again
  function drawAgain() {
    if (!isLoaded) {
      return;
    }
    panX = parseFloat(document.getElementById("xa").value);
    panY = parseFloat(document.getElementById("ya").value);
    zooms = parseFloat(document.getElementById("za").value);
    show();
    abortRun();
    startRun();
  }
  //zoom in function
  function zoomIn() {
    if (!isLoaded) {
      return;
    }
    zooms = zooms + zf;
    pan = panX + 2 / zooms - (panX - 1 / zooms);
    document.getElementById("za").value = zooms;

    show();
    abortRun();
    startRun();
  }
  //zoom out function
  function zoomOut() {
    if (!isLoaded) {
      return;
    }
    zooms = zooms - zf;
    pan = panX + 2 / zooms - (panX - 1 / zooms);
    document.getElementById("za").value = zooms;

    show();
    abortRun();
    startRun();
  }
  //adjust zoomfactor
  function zoomFactor() {
    if (!isLoaded) {
      return;
    }
    var temp = document.getElementById("zf").value;
    zf = parseFloat(temp);
    show();
  }
  //adjust maxI
  function changeMaxI() {
    if (!isLoaded) {
      return;
    }
    var temp = document.getElementById("mi").value;
    maxI = parseInt(temp);
    pallete.setNumberRange(0, maxI);
    show();
    abortRun();
    startRun();
  }
  //changes coloringType
  function changeColoringType(obj) {
    if (!isLoaded) {
      return;
    }
    var temp = obj.value;
    coloringType = temp;
    show();
    abortRun();
    startRun();
  }
  //adjust pallete
  function changePallete() {
    if (!isLoaded) {
      return;
    }
    var temp = document.getElementById("plt").value.split(" ");
    if (temp.length < 3) {
      alert(" Please enter more colors ");
      return;
    }
    pallete.setSpectrumByArray(temp);
    show();
    abortRun();
    startRun();
  }
  //updateCoords
  function changeCoords() {
    if (!isLoaded) {
      return;
    }
    var temp = document.getElementById("crd").value.split(" ");
    if (temp.length < 4) {
      alert(" Please enter complete details");
      return;
    }
    panX = parseFloat(temp[0]);
    panY = parseFloat(temp[1]);
    zooms = parseFloat(temp[2]);
    maxI = parseFloat(temp[3]);
    zf = 1.5;
    pan = panX + 2 / zooms - (panX - 1 / zooms);

    pallete.setNumberRange(0, maxI);
    document.getElementById("xa").value = panX;
    document.getElementById("ya").value = panY;
    document.getElementById("za").value = zooms;
    document.getElementById("mi").value = maxI;
    document.getElementById("zf").value = zf;
    show();
    abortRun();
    // mandelbrotLargePixel(zooms, panX, panY);
    startRun();
  }
  //to be done
  function fullResize() {}
  //resize canvas
  function resize() {
    canvasWidth = app.view.width =
      parseInt(prompt("Please enter canvas width in pixels", 200)) || 200;
    canvasHeight = app.view.height =
      parseInt(prompt("Please enter canvas height in pixels", 200)) || 200;
    work();
  }
  function iterationsTimesTwo() {
    if (!isLoaded) {
      return;
    }
    maxI *= 2;
    show();
    abortRun();
    startRun();
  }
  function iterationsDividedByTwo() {
    if (!isLoaded) {
      return;
    }
    maxI /= 2;
    show();
    abortRun();
    startRun();
  }
  function changeBigPixelSize() {
    if (!isLoaded) {
      return;
    }
    Swal.fire({
      title: "Info",
      input: "text",
      text: "Change big pixel size",
      inputValue: 20,
      inputPlaceholder: "20",
    }).then(function (result) {
      var value = parseInt(result.value);
      if (Number.isNaN(value)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid number!",
        });
        return;
      } else {
        largePixelSize = value;
      }
    });
  }
  //show details
  function show() {
    var temp =
      "Scroll: " +
      pan +
      "<br /> Current zoom: " +
      zooms +
      "<br /> left: " +
      panX +
      "<br /> right: " +
      (panX + canvasWidth / zooms) +
      "<br /> top: " +
      panY +
      "<br /> bottom: " +
      (panY + flipImaginaryAxis * (canvasHeight / zooms)) +
      "<br /> zoom factor: " +
      zf +
      "<br /> max iterations of loop: " +
      maxI +
      "<br /> uses " +
      coloringType +
      " algorithm for coloring";
    document.getElementById("dtls").innerHTML = temp;
  }
  /*favorable zoom
-0.7253464660778749
0.2520240908085526
18892488895.231102

-0.373346235978374
-0.6582261932152258
7000

-0.3618206208864465
-0.6453957620586814
155300315925100
*/
  //about function
  function about() {
    // alert("A mandelbrot set generator in javascript created by pvzzombs")
    // console.log("A mandelbrot set generator in javascript created by pvzzombs");
    Swal.fire({
      icon: "info",
      title: "About",
      text: "A mandelbrot set generator in javascript created by pvzzombs. ",
    });
  }

  function startMandelbrot() {
    thread = new Worker("getOptimalPixel.js");
    thread.onmessage = function (e) {
      // console.log("Time is ", e.data.ms);
      // console.log("Pixel is ", e.data.pixelSize);
      isLoaded = true;
      largePixelSize = e.data.pixelSize;
      work();
      document.getElementById("loadingText").innerText = "";
      // document.getElementById("canvasWrapper").style.display = "block";
      // alert();
    };
  }

  startMandelbrot();

  document.getElementById("timesTwo").onclick = iterationsTimesTwo;
  document.getElementById("divideTwo").onclick = iterationsDividedByTwo;
  document.getElementById("bigPixel").onclick = changeBigPixelSize;

  document.getElementById("trigger1").onclick = fullResize;
  document.getElementById("trigger2").onclick = work;
  document.getElementById("trigger3").onclick = drawAgain;
  document.getElementById("trigger4").onclick = resize;
  document.getElementById("trigger5").onclick = about;

  document.getElementById("flipImaginaryAxis").onclick = flipImagAxis;

  document.getElementById("trigger6").onclick = resetCoordinates;

  document.getElementById("xp").onclick = function() { xScroll(1); }
  document.getElementById("xm").onclick = function() { xScroll(0); }

  document.getElementById("yp").onclick = function() { yScroll(1); }
  document.getElementById("ym").onclick = function() { yScroll(0); }

  document.getElementById("xz").onclick = zoomIn;
  document.getElementById("yz").onclick = zoomOut;

  document.getElementById("zfb").onclick = zoomFactor;
  document.getElementById("trigger7").onclick = changeMaxI;

  document.getElementById("lrg").onclick = changePallete;

  document.getElementById("smoothColoring").onclick = function() {changeColoringType(document.getElementById("smoothColoring")); };
  document.getElementById("escapeTime").onclick = function() {changeColoringType(document.getElementById("escapeTime")); };

  document.getElementById("updt").onclick = changeCoords;
})();

// work();
