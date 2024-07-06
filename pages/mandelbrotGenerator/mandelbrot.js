//Create the canvas, then collect the height and width
var canvasWidth, canvasHeight, canvasContext, canvas, rect;
//zoomon click
var zoomOnClick = true;
//flag to tell whether to use setInterval or not
var useInterval = true;
//flip imaginary axis (-1 means true, 1 is default)
var flipImaginaryAxis = 1;
//Sizes of pixel
var pixelSizes = [8, 5, 1];
//Use to store setTimeout IDs for calling mandelbrot();
var mandelbrotCalls = new Array(pixelSizes.length);
//Store setInterval IDs
var drawColumnIDs = new Array(pixelSizes.length);
//to prevent error during loading, make sure that
//the canvas is loaded first before calling any methods
canvas = document.getElementById("paper");

var canvasWrapper = document.getElementById("canvasWrapper");
canvas.width = canvasWrapper.clientWidth;
//This is not set to clientHeight so that
//the canvas is square
canvas.height = canvasWrapper.clientWidth;

canvasContext = canvas.getContext("2d");
canvasWidth = canvas.width;
canvasHeight = canvas.height;
//when canvas is clicked, call drawOnClick function
canvas.onclick = function (e) {
  drawOnClick(e);
}
//changes the mandelbrot set based on mouse clicks
function drawOnClick(e) {
  rect = canvas.getBoundingClientRect()
  var mouseX = (e.clientX - rect.left);
  var mouseY = (e.clientY - rect.top);
  if (zoomOnClick) {
    var mx = panX + mouseX / zooms;
    var my = panY + flipImaginaryAxis * (mouseY / zooms);
    zooms *= zf;
    panX = mx - ((e.clientX - rect.left) / zooms);
    panY = my - flipImaginaryAxis * ((e.clientY - rect.top) / zooms);
  } else {
    var mx = panX + mouseX / zooms;
    var my = panY + flipImaginaryAxis * (mouseY / zooms);
    zooms /= zf;
    panX = mx - ((e.clientX - rect.left) / zooms);
    panY = my - flipImaginaryAxis * ((e.clientY - rect.top) / zooms);
  }
  pan = (panX + 2 / zooms) - (panX - 1 / zooms);
  document.getElementById("xa").value = panX;
  document.getElementById("ya").value = panY;
  document.getElementById("za").value = zooms;
  pallete.setNumberRange(0, maxI);

  show();
  abortRun();
  startRun();
}
//when + was clicked above the canvas
function plus() {
  zoomOnClick = true;
}
//same here
function minus() {
  zoomOnClick = false;
}
//aborts startRun
function abortRun() {
  for (var i = 0; i < mandelbrotCalls.length; i++) {
    clearTimeout(mandelbrotCalls[i]);
  }
  if (useInterval) {
    for (var i = 0; i < drawColumnIDs.length; i++) {
      clearInterval(drawColumnIDs[i]);
    }
  } else {
    for (var i = 0; i < drawColumnIDs.length; i++) {
      cancelAnimationFrame(drawColumnIDs[i]);
    }
  }
}
//starts calling mandelbrot
function startRun() {
  function mandelbrotCallFactory(i) {
    return function () {
      mandelbrot(zooms, panX, panY, pixelSizes[i], i);
    }
  }
  for (var i = 0; i < pixelSizes.length; i++) {
    mandelbrotCalls[i] = setTimeout(mandelbrotCallFactory(i));
    //console.log(i);
  }
}
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
var pan, zooms, panX, panY, zf, maxI = 50,
  ticks, coloringType;
//pallete for escapeTime
var pallete = new Rainbow();
pallete.setSpectrum("#000764", "#206bcb", "#edffff", "#ffaa00", "#000200");
pallete.setNumberRange(0, maxI);
//pallete for smoothColoring
var _pallete = ["#000764", "#206bcb", "#edffff", "#ffaa00", "#000200"];
// mandelbrot helper function
function mdbl(px, py, x, y, zm, panX, panY, scale, func) {
  for (py = 0; py < canvasHeight; py += scale) {
    //zoom factors
    x0 = panX + px / zm;
    y0 = panY + flipImaginaryAxis * (py / zm);
    var x = 0;
    var y = 0;
    var i = 0;
    var xtemp;
    while (x * x + y * y <= 4 && i < maxI) {
      xtemp = x * x - y * y + x0
      y = 2 * x * y + y0
      x = xtemp
      i = i + 1
    }
    //coloring
    func(px, py, x, y, i, scale);
  }
}

function mandelbrot(zm, panX, panY, scale, arrayIndex) {
  scale = scale || 1;
  //px - Canvas x
  //py - canvas y
  //x - real x
  //y - imaginary y
  var px, py, x, y;
  px = 0;
  if (useInterval) {
    drawColumnIDs[arrayIndex] = setInterval(function () {
      if (px < canvasWidth) {
        mdbl(px, py, x, y, zm, panX, panY, scale, coloringMethod);
        px += scale;
      } else {
        clearInterval(drawColumnIDs[arrayIndex]);
      }
    });
  } else {
    function drawStep() {
      if (px < canvasWidth) {
        mdbl(px, py, x, y, zm, panX, panY, scale, coloringMethod);
        px += scale;
        drawColumnIDs[arrayIndex] = requestAnimationFrame(drawStep);
      } else {
        cancelAnimationFrame(drawColumnIDs[arrayIndex]);
      }
    }
    drawColumnIDs[arrayIndex] = requestAnimationFrame(drawStep);
  }
}

function coloringMethod(px, py, x, y, i, scale) {
  if ("smoothColoring" === coloringType) {
    if (i < maxI) {
      log_zn = Math.log(x * x + y * y) / 2
      nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
      i = i + 1 - nu;
      canvasContext.fillStyle = color(i / maxI * (_pallete.length - 1));
      canvasContext.fillRect(px, py, scale, scale);
    } else {
      canvasContext.fillStyle = "black";
      canvasContext.fillRect(px, py, scale, scale);
    }
  } else {
    canvasContext.fillStyle = color(i);
    canvasContext.fillRect(px, py, scale, scale);
  }
}
/******************************************************************/
/******************************************************************/
function color(num) {
  switch (coloringType) {
    case "escapeTime":
      var selection = pallete.colourAt(num);
      return "#" + selection;
      break;
    case "smoothColoring":
      return interpolation(num);
      break;
    default:
      var selection = pallete.colourAt(num);
      return "#" + selection;
  }
}

function hexToRGBObject(hex) {
  hex = (hex + "").replace("#", "");
  return {
    r: parseInt(hex.charAt(0) + hex.charAt(1), 16),
    g: parseInt(hex.charAt(2) + hex.charAt(3), 16),
    b: parseInt(hex.charAt(4) + hex.charAt(5), 16)
  }
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
//reset
function work() {
  flipImaginaryAxis = 1;
  pan = 0.1;
  zooms = canvasWidth / 4;
  panX = -2.5;
  panY = -2.0 * flipImaginaryAxis;
  zf = 1.5;
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
  startRun();
}
//reset coordinates
function resetCoordinates() {
  pan = 0.1;
  zooms = canvasWidth / 4;
  panX = -2.5;
  panY = -2.0 * flipImaginaryAxis;
  document.getElementById("xa").value = panX;
  document.getElementById("ya").value = panY;
  document.getElementById("za").value = zooms;
  show();
  abortRun();
  startRun();
}
//flip imaginary axis
function flipImagAxis() {
  flipImaginaryAxis = flipImaginaryAxis == 1 ? -1 : 1;
  panY = panY * -1;
  document.getElementById("ya").value = panY;
  show();
  abortRun();
  startRun();
}
//left to right scroll adjustment
function xScroll(n) {
  var temp = n ? parseFloat(document.getElementById("xa").value) + pan : parseFloat(document.getElementById("xa").value) - pan;
  document.getElementById("xa").value = temp;
  panX = temp;
  show();
  abortRun();
  startRun();
}
//top to bottom scroll adjustment
function yScroll(n) {
  var temp = n ? parseFloat(document.getElementById("ya").value) + pan : parseFloat(document.getElementById("ya").value) - pan;
  document.getElementById("ya").value = temp;
  panY = temp;
  show();
  abortRun();
  startRun();
}
//draw again
function drawAgain() {
  panX = parseFloat(document.getElementById("xa").value);
  panY = parseFloat(document.getElementById("ya").value);
  zooms = parseFloat(document.getElementById("za").value);
  show();
  abortRun();
  startRun();
}
//the change zoom function
function zoom() {
  zooms = document.getElementById("za").value;
  mx = ((panX + (canvasWidth - 1) / zooms) - panX) / 2;
  panX -= mx;
  my = ((panY + (canvasHeight - 1) / zooms) - panY) / 2;
  panY -= mx;
  show();
  abortRun();
  startRun();
}
//zoom in function
function zoomIn() {
  zooms = zooms + zf;
  pan = (panX + 2 / zooms) - (panX - 1 / zooms);
  document.getElementById("za").value = zooms;

  show();
  abortRun();
  startRun();
}
//zoom out function
function zoomOut() {
  zooms = zooms - zf;
  pan = (panX + 2 / zooms) - (panX - 1 / zooms)
  document.getElementById("za").value = zooms;

  show();
  abortRun();
  startRun();
}
//adjust zoomfactor
function zoomFactor() {
  var temp = document.getElementById("zf").value;
  zf = parseFloat(temp);
  show();
}
//adjust maxI
function changeMaxI() {
  var temp = document.getElementById("mi").value;
  maxI = parseInt(temp);
  pallete.setNumberRange(0, maxI);
  show();
  abortRun();
  startRun();
}
//changes coloringType
function changeColoringType(obj) {
  var temp = obj.value;
  coloringType = temp;
  show();
  abortRun();
  startRun();
}
//adjust pallete
function changePallete() {
  var temp = (document.getElementById("plt").value).split(" ");
  if (temp.length < 3) {
    alert(" Please enter more colors ");
    return
  }
  pallete.setSpectrumByArray(temp);
  show();
  abortRun();
  startRun();
}
//updateCoords
function changeCoords() {
  var temp = (document.getElementById("crd").value).split(" ");
  if (temp.length < 4) {
    alert(" Please enter complete details");
    return
  }
  panX = parseFloat(temp[0]);
  panY = parseFloat(temp[1]);
  zooms = parseFloat(temp[2]);
  maxI = parseFloat(temp[3]);
  zf = 1.5;
  pan = (panX + 2 / zooms) - (panX - 1 / zooms);

  pallete.setNumberRange(0, maxI);
  document.getElementById("xa").value = panX;
  document.getElementById("ya").value = panY;
  document.getElementById("za").value = zooms;
  document.getElementById("mi").value = maxI;
  document.getElementById("zf").value = zf;
  show();
  abortRun();
  startRun();
}
//to be done
function fullResize() {}
//resize canvas
function resize() {
  canvasWidth = canvas.width = parseInt(prompt("Please enter canvas width in pixels", 200)) || 200;
  canvasHeight = canvas.height = parseInt(prompt("Please enter canvas height in pixels", 200)) || 200;
  work();
}
//show details
function show() {
  var temp = "Scroll: " + pan +
    "<br /> Current zoom: " + zooms +
    "<br /> left: " + panX +
    "<br /> right: " + (panX + canvasWidth / zooms) +
    "<br /> top: " + panY +
    "<br /> bottom: " + (panY + flipImaginaryAxis * (canvasHeight / zooms)) +
    "<br /> zoom factor: " + zf +
    "<br /> max iterations of loop: " + maxI +
    "<br /> uses " + coloringType + " algorithm for coloring";
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
    text: "A mandelbrot set generator in javascript created by pvzzombs. "
  });
}

work();