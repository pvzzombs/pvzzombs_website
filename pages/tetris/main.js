const side = 15;


const GRIDCELLWCOUNT = 10;
const GRIDCELLHCOUNT = 20;

const GRIDCELLW = GRIDCELLWCOUNT * side;
const GRIDCELLH = GRIDCELLHCOUNT * side;

const W = 300;
const H = 400;

var tetromino = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
}

var tetrominoStart = {
  I: {
    x: 3,
    y: -1
  },
  L: {
    x: 4,
    y: 0
  },
  J: {
    x: 3,
    y: 0
  },
  O: {
    x: 4,
    y: 0
  },
  S: {
    x: 4,
    y: 0
  },
  T: {
    x: 4,
    y: 0
  },
  Z: {
    x: 4,
    y: 0
  }
}

function rotateBody(mat) {
  var h = mat.length;
  var w = mat[0].length;
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < y + 1; x++) {
      var temp = mat[y][x];
      mat[y][x] = mat[x][y];
      mat[x][y] = temp;
    }
  }

  for (var y = 0; y < h; y++) {
    var left = 0;
    var right = w - 1;
    while (left <= Math.floor((w - 1) / 2)) {
      var temp = mat[y][left];
      mat[y][left] = mat[y][right];
      mat[y][right] = temp;
      left++;
      right--;
    }
  }
  return mat;
}

function copyTetromino(mat) {
  var output = [];
  for (var y = 0; y < mat.length; y++) {
    output[y] = mat[y].slice();
  }
  return output;
}

// rotateBody(copyTetromino(tetromino.L));
// console.log(tetromino.L);

var currentTetromino = null;

var toX = -1;
var toY = -1;

var ghostX = -1;
var ghostY = -1;

var grid = [];

function tryMove(d) {
  if (d === "down") {
    var newToY = toY + 1;
    for (var y = 0; y < currentTetromino.length; y++) {
      for (var x = 0; x < currentTetromino[0].length; x++) {
        if (newToY + y < 0) { continue; }
        if (currentTetromino[y][x] === 1 && newToY + y >= GRIDCELLHCOUNT) {
          return "ground";
        } else if (currentTetromino[y][x] === 1 && grid[newToY + y][toX + x] !== 0) {
          return "tetromino";
        }
      }
    }
  } else if (d === "left") {
    var newToX = toX - 1;
    for (var y = 0; y < currentTetromino.length; y++) {
      for (var x = 0; x < currentTetromino[0].length; x++) {
        if (toY + y < 0) { continue; }
        if (currentTetromino[y][x] === 1 && newToX + x < 0) {
          return "wall";
        } else if (currentTetromino[y][x] === 1 && grid[toY + y][newToX + x] !== 0) {
          return "tetromino";
        }
      }
    }
  } else if (d === "right") {
    var newToX = toX + 1;
    for (var y = 0; y < currentTetromino.length; y++) {
      for (var x = 0; x < currentTetromino[0].length; x++) {
        if (toY + y < 0) { continue; }
        if (currentTetromino[y][x] === 1 && newToX + x >= GRIDCELLWCOUNT) {
          return "wall";
        } else if (currentTetromino[y][x] === 1 && grid[toY + y][newToX + x] !== 0) {
          return "tetromino";
        }
      }
    }
  }
  return "";
}

function tryMoveGhost(d) {
  if (d === "down") {
    var newGhostY = ghostY + 1;
    for (var y = 0; y < currentTetromino.length; y++) {
      for (var x = 0; x < currentTetromino[0].length; x++) {
        if (currentTetromino[y][x] === 1 && newGhostY + y >= GRIDCELLHCOUNT) {
          return "ground";
        } else if (currentTetromino[y][x] === 1 && grid[newGhostY + y][ghostX + x] !== 0) {
          return "tetromino";
        }
      }
    }
  }
  return "";
}

function tryRotate() {
  var newTetromino = rotateBody(copyTetromino(currentTetromino));
  // console.log(newTetromino, "hey");
  for (var y = 0; y < newTetromino.length; y++) {
    for (var x = 0; x < newTetromino[0].length; x++) {
      // console.log(toY + y, toX + x);
      if (toY + y < 0) { continue; }
      if (newTetromino[y][x] === 1 && toY + y >= GRIDCELLHCOUNT) {
        return "ground";
      } else if (newTetromino[y][x] === 1 && toX + x >= GRIDCELLWCOUNT) {
        return "wall";
      } else if (newTetromino[y][x] === 1 && toX + x < 0) {
        return "wall";
      } else if (newTetromino[y][x] === 1 && grid[toY + y][toX + x] !== 0) {
        return "tetromino";
      }
    }
  }

  return "";
}

function copyTetrominoToGrid() {
  for (var y = 0; y < currentTetromino.length; y++) {
    for (var x = 0; x < currentTetromino[0].length; x++) {
      if (y + toY < 0 || x + toX < 0 || toY + y >= GRIDCELLHCOUNT || toX + x >= GRIDCELLWCOUNT) {
        continue;
      } else {
        if (currentTetromino[y][x] === 1) {
          grid[toY + y][toX + x] = 1;
        }
      }
    }
  }
}

var tetrominoes = ["I", "L", "J", "O", "S", "T", "Z"];
var currentID = 0;

function shuffle() {
  currentID++;
  if (currentID >= tetrominoes.length) {
    currentID = 0;
    for (var i = 0; i < tetrominoes.length; i++) {
      var targetIndex = Math.floor(Math.random() * (tetrominoes.length - 1 - i) + i);
      var temp = tetrominoes[i];
      tetrominoes[i] = tetrominoes[targetIndex];
      tetrominoes[targetIndex] = temp;
    }
  }
}

function spawnTetromino() {
  // currentTetromino = tetromino.I;
  // toX = tetrominoStart.I.x;
  // toY = tetrominoStart.I.y;
  currentTetromino = copyTetromino(tetromino[tetrominoes[currentID]]);
  toX = tetrominoStart[tetrominoes[currentID]].x;
  toY = tetrominoStart[tetrominoes[currentID]].y;
  for (var y = 0; y < currentTetromino.length; y++) {
    for (var x = 0; x < currentTetromino[0].length; x++) {
      if (toY + y < 0) { continue; }
      if (currentTetromino[y][x] === 1 && grid[toY + y][toX + x] !== 0) {
        noLoop();
        console.log("Game Over!");
        return;
      }
    }
  }
}

function spawnGhostTetromino() {
  ghostX = toX;
  ghostY = toY;
  while(tryMoveGhost("down") === "") {
    ghostY++;
  }
}

function checkRows() {
  var z = GRIDCELLHCOUNT - 1;
  for (var y = GRIDCELLHCOUNT - 1; y >= 0; y--) {
    // var isFullZ = true;
    var isFullY = true;

    // for (var x = 0; x < GRIDCELLWCOUNT; x++) {
    //   if (grid[z][x] === 0) {
    //     isFullZ = false;
    //     break;
    //   }
    // }

    for (var x = 0; x < GRIDCELLWCOUNT; x++) {
      if (grid[y][x] === 0) {
        isFullY = false;
        break;
      }
    }

    if (!isFullY) {
      for (var x = 0; x < GRIDCELLWCOUNT; x++) {
        var temp = grid[y][x];
        grid[y][x] = grid[z][x];
        grid[z][x] = temp;
      }
      z--;
    }
  }

  for (var y = 0; y < GRIDCELLHCOUNT; y++) {
    var isFull = true;
    for (var x = 0; x < GRIDCELLWCOUNT; x++) {
      if (grid[y][x] === 0) {
        isFull = false;
      }
    }
    if (isFull) {
      for (var x = 0; x < GRIDCELLWCOUNT; x++) {
        grid[y][x] = 0;
      }
    }
  }
}

function moveDown() {
  if (tryMove("down") === "") {
    toY += 1;
  } else {
    copyTetrominoToGrid();
    checkRows();
    spawnTetromino();
    shuffle();
  }
  spawnGhostTetromino();
}

function setup() {
  createCanvas(W, H);
  frameRate(60);
  for (var i = 0; i < GRIDCELLHCOUNT; i++) {
    grid.push(new Array(GRIDCELLWCOUNT));
    for (var j = 0; j < GRIDCELLWCOUNT; j++) {
      grid[i][j] = 0;
    }
  }

  // shuffle tetrominoes
  for (var i = 0; i < tetrominoes.length; i++) {
    var targetIndex = Math.floor(Math.random() * (tetrominoes.length - 1 - i) + i);
    var temp = tetrominoes[i];
    tetrominoes[i] = tetrominoes[targetIndex];
    tetrominoes[targetIndex] = temp;
  }
  // console.log(grid);
  spawnTetromino();
  shuffle();
  spawnGhostTetromino();
}


var frameCounter = 0;
var elapsedDT = 0;
function draw() {
  background(128);
  strokeWeight(2);
  for (var y = 0; y < GRIDCELLHCOUNT; y++) {
    for (var x = 0; x < GRIDCELLWCOUNT; x++) {
      if (grid[y][x] === 1) {
        fill("green");
      } else {
        fill("white")
      }
      rect(x * side, y * side, side, side);
    }
  }
  // draw ghost
  for (var y = 0; y < currentTetromino.length; y++) {
    for (var x = 0; x < currentTetromino[0].length; x++) {
      if (currentTetromino[y][x] === 1) {
        fill ("gray");
        rect((ghostX + x) * side, (ghostY + y) * side, side, side);
      }
    }
  }
  // draw current
  for (var y = 0; y < currentTetromino.length; y++) {
    for (var x = 0; x < currentTetromino[0].length; x++) {
      if (currentTetromino[y][x] === 1) {
        fill ("blue")
        rect((toX + x) * side, (toY + y) * side, side, side);
      }
    }
  }
  // ++frameCounter;
  // if (frameCounter >= 60) {
  //   moveDown();
  //   frameCounter = 0;
  // }
  elapsedDT += deltaTime;
  if (elapsedDT >= 1000) {
    moveDown();
    elapsedDT = 0;
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    // var decide  = tryMove("down");
    // console.log(decide);
    // if (decide === "") {
    //   toY += 1;
    // }
    moveDown();
  } else if (key === "a" || key === 'A') {
    var decide = tryMove("left");
    if (decide === "") {
      toX -= 1;
      elapsedDT = 0;
      spawnGhostTetromino();
    }
  } else if (key === "d" || key === 'D') {
    var decide = tryMove("right");
    if (decide === "") {
      toX += 1;
      elapsedDT = 0;
      spawnGhostTetromino();
    }
  } else if (key === 'W' || key === 'w') {
    var decide = tryRotate();
    if (decide === "") {
      elapsedDT = 0;
      rotateBody(currentTetromino);
      spawnGhostTetromino();
    }
  } else if (key === " ") {
    while(tryMove("down") === "") {
      // toY += 1;
      moveDown();
    }
  }
}