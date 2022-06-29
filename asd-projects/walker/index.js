/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var keyRight = {
    "UP": 38,
    "DOWN": 40,
    "LEFT": 37,
    "RIGHT": 39
  }
  var keyLeft = {
    "W": 87,
    "S": 83,
    "A": 65,
    "D": 68
  }

  function Walkers($id) {
    var walker = {};
    walker.id = $id;
    walker.y = parseFloat($($id).css("top"));
    walker.x = parseFloat($($id).css("left"));
    walker.speedX = 0;
    walker.speedY = 0;
    walker.width = $($id).width();
    walker.height = $($id).height();
    return walker;
  }


  var walker1 = Walkers("#walker1");
  var walker2 = Walkers("#tag2");
  console.log(walker1);
  var board = jQuery("#board");
  var boardWidth = board.width();
  var boardHeight = board.height();
  var stopX = boardWidth - walker1.width;
  var stopY = boardHeight - walker1.height;
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // core logic 
  function handleKeyDown(event) { // tells the gameItems to start moving
    if (event.which === keyRight.UP) {
      walker1.speedY = -5;
    }
    else if (event.which === keyRight.DOWN) {
      walker1.speedY= 5;
    }
    else if (event.which === keyRight.LEFT) {
      walker1.speedX = -5;
    }
    else if (event.which === keyRight.RIGHT) {
      walker1.speedX = 5;
    }
    else if (event.which === keyLeft.A) {
      walker2.speedX = -5;
    }
    else if (event.which === keyLeft.D) {
      walker2.speedX = 5;
    }
    else if (event.which === keyLeft.W) {
      walker2.speedY= -5;
    }
    else if (event.which === keyLeft.S) {
      walker2.speedY= 5;
    }

  }
  function handleKeyUp(event) { // tells the gameItems when to stop moving
    if (keyRight.UP === event.which) {
      walker1.speedY = 0;
    }
    if (keyRight.DOWN === event.which) {
      walker1.speedY = 0;
    }
    if (keyRight.LEFT === event.which) {
      walker1.speedX = 0;
    }
    if (keyRight.RIGHT === event.which) {
      walker1.speedX = 0;
    }
    if (keyLeft.W === event.which) {
      walker2.speedY = 0;
    }
    if (keyLeft.S === event.which) {
      walker2.speedY = 0;
    }
    if (keyLeft.A === event.which) {
      walker2.speedX = 0;
    }
    if (keyLeft.D === event.which) {
      walker2.speedX = 0;
    }
  }

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    redrawGameItem(walker2);
    repositionGameItem(walker2);
    setBoundary(walker2);
    redrawGameItem(walker1);
    repositionGameItem(walker1);
    setBoundary(walker1);
  }

  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem(walker) { // keeps the gameItems moving and tells them when and if they need to stop
    walker.y += walker.speedY;
    walker.x += walker.speedX;

    if (walker.x >= boardWidth) {
      walker.speedX = 0;
    }
    if (walker.y >= boardHeight) {
      walker.speedY = 0;
    }
    if (walker.x <= 0) {
      walker.speedX = 0;
    }
    if (walker.y <= 0) {
      walker.speedY = 0;
    }
  }
  function setBoundary(walker) { // creates a boundary to keep the gameItems inside the box 
    if (walker.x > stopX) {
      walker.x = stopX;
    }
    if (walker.y > stopY) {
      walker.y = stopY;
    }
    if (walker.x < 0) {
      walker.x = 0;
    }
    if (walker.y < 0) {
      walker.y = 0;
    }

  }

  function redrawGameItem(walker) { // gives the gameItems a respawn position
    $(walker.id).css("left", walker.x);
    $(walker.id).css("top", walker.y);
  }
}


