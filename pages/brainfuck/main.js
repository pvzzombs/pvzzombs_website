var program = [];
var pc = 0;
var pointer = 0;
var running;
var error = false;
var speed = 50;
var color = "#7CFF89";
var status = "idle";
var boxCount = 30;

function id($) {
  return document.getElementById($);
}

function right() {
  if (id("box" + (pointer + 2)) == undefined) {
    //id("output").value += "\nError : Overflow!!! Stopped at memory " + pointer + " on program id " + pc;
    //error = true;
    //return ;
    var node = document.createElement("div");
    node.className = "box";
    node.id = "box" + (pointer + 2);
    id("wrapper").appendChild(node);
    boxCount++;
  }
  id("box" + (pointer + 1)).style.background = "";
  id("box" + (pointer + 2)).style.background = color;
}

function left() {

  if (id("box" + (pointer)) == undefined) {
    id("output").value += "\nError : Overflow!!! Stopped at memory " + pointer + " on program id " + pc;
    error = true;
    return;
  }
  id("box" + (pointer + 1)).style.background = "";
  id("box" + (pointer)).style.background = color;
}

function parse() {
  status = "ready";
  id("status").innerText = status;
  program = [];
  pointer = 0;
  pc = 0;
  error = false;
  clearInterval(running);
  for (var i = 1; i <= boxCount; i++) {
    id("box" + i).innerText = 0;
    id("box" + i).style.background = "";
  }
  id("output").value = "";
  id("box1").style.background = "#7CFF89";
  program = bf(id("code").value);
}

function ok() {
  //console.log("Still running");
  if (status === "idle") {
    Swal.fire({
      type: "error",
      title: "Error",
      text: "Parse first!"
    });
    clearInterval(running);
    return;
  }
  if (error) {
    clearInterval(running);
    return;
  }

  var cmd = program[pc];
  if (!cmd) {
    Swal.fire({
      type: "success",
      title: "Success",
      text: "Compiler finished!"
    });
    status = "idle";
    id("status").innerText = status;
    program = [];
    pointer = 0;
    pc = 0;
    clearInterval(running);
    return;
  }

  var cb = "box" + (pointer + 1);
  pc = pc + 1;

  switch (cmd.cmd) {
    case "+": {
      id(cb).innerText = cmd.mem;
      pointer = cmd.pnt;
      break;
    }
    case "-": {
      id(cb).innerText = cmd.mem;
      pointer = cmd.pnt;
      break;
    }
    case ">": {
      right();
      if (id("box" + (pointer + 2)) == undefined) {
        id("output").value += "\nError : Cannot Write!!! Stopped at memory " + pointer + " on program id " + pc;
        error = true;
        return;
      }
      id("box" + (pointer + 2)).innerText = cmd.mem;
      pointer = cmd.pnt;
      break;
    }
    case "<": {
      left();
      if (id("box" + (pointer)) == undefined) {
        id("output").value += "\nError : Cannot Write!!! Stopped at memory " + pointer + " on program id " + pc;
        error = true;
        return;
      }
      id("box" + (pointer)).innerText = cmd.mem;
      pointer = cmd.pnt;
      break;
    }
    case ".": {
      id("output").value += cmd.code;
      id(cb).innerText = cmd.mem;
      pointer = cmd.pnt;
      break;
    }
    case ",": {
      id(cb).innerText = cmd.mem;
      pointer = cmd.pnt;
      break;
    }
    case "[": {
      id(cb).innerText = cmd.mem;
      pointer = cmd.pnt;
    }
    case "]": {
      id(cb).innerText = cmd.mem;
      pointer = cmd.pnt;
    }
  }
}

function run() {
  if (status === "idle") {
    Swal.fire({
      type: "error",
      title: "Error",
      text: "Parse first!"
    });
  } else if (status === "running") {
    Swal.fire({
      type: "info",
      title: "Info",
      text: "Already running!"
    });
  } else {
    status = "running";
    id("status").innerText = status;
    running = setInterval(ok, speed);
  }
}

function pause() {
  if (status === "running") {
    status = "paused";
    id("status").innerText = status;
    clearInterval(running);
  } else if (status === "paused") {
    Swal.fire({
      type: "info",
      title: "Info",
      text: "Already paused!"
    });
  } else {
    Swal.fire({
      type: "info",
      title: "Info",
      text: "Not yet running!"
    });
  }
}

function changeSpeed() {
  Swal.fire({
    title: "Info",
    input: "text",
    text: "Change execution speed in milliseconds",
    inputValue: 50,
    inputPlaceholder: "50"
  }).then(function (result) {
    var value = parseInt(result.value);
    if (Number.isNaN(value)) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "Invalid number!"
      });
      return;
    }
    if (value < 0) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "Lowest allowed number is 0"
      });
      return;
    }
    if (value > 10000) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "Highest allowed number is 10000"
      });
      return;
    }
    speed = value;
  });
}