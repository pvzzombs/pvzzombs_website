//the world
var playerSprite;
var pipesSprites;
var backgroundSprite;

// constants
var gravity = 0.3;
var flap = -6;
// var friction = 0.99;
var speed = 2;

// var bird;
// var pipes;
// for relocating:
var birdPos = {
  x: 0,
  y: 0
};

// global pipesManager
var pipesManager;

var score = 0;
var highScore = 0;
var speedUp = 0;

// for fps
var lastTime;
var nowTime;
var dt;
var fpm;

// sounds
var sfx_die;
var sfx_hit;
var sfx_point;
var sfx_wing;

// fonts
var mainFont;

// bird death position
var birdDeathX;
var birdDeathY;

// Scene Manager
var mgr;
