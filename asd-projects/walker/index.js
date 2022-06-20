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

  var xPosition = 0;
  var xPosition2 = 0;
  var yPosition = 0;
  var yPosition2 = 0;
  var xSpeed = 0;
  var xSpeed2 = 0
  var ySpeed = 0;
  var ySpeed2 = 0;
  var board = jQuery("#board");
  var boardWidth = board.width();
  var boardHeight = board.height();
  console.log(walker1.css);
  var stopX = boardWidth - $("#walker1").width();
  var stopY = boardHeight - $("#walker1").height();

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
      ySpeed = -5;
    }
    else if (event.which === keyRight.DOWN) {
      ySpeed = 5;
    }
    else if (event.which === keyRight.LEFT) {
      xSpeed = -5;
    }
    else if (event.which === keyRight.RIGHT) {
      xSpeed = 5;
    }
    else if (event.which === keyLeft.A) {
      xSpeed2 = 5;
    }
    else if (event.which === keyLeft.D) {
      xSpeed2 = -5;
    }
    else if (event.which === keyLeft.W) {
      ySpeed2 = -5;
    }
    else if (event.which === keyLeft.S) {
      ySpeed2 = 5;
    }

  }
  function handleKeyUp(event) { // tells the gameItems when to stop moving
    if (keyRight.UP === event.which) {
      ySpeed = 0;
    } 
    if (keyRight.DOWN === event.which) {
      ySpeed = 0;
    } 
    if (keyRight.LEFT === event.which) {
      xSpeed = 0;
    } 
    if (keyRight.RIGHT === event.which) {
      xSpeed = 0;
    } 
    if (keyLeft.W === event.which) {
      ySpeed2 = 0;
    } 
    if (keyLeft.S === event.which) {
      ySpeed2 = 0;
    }
    if (keyLeft.A === event.which) {
      xSpeed2 = 0;
    } 
    if (keyLeft.D === event.which) {
      xSpeed2 = 0;
    } 
  }

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    redrawGameItem();
    repositionGameItem();
    setBoundary();

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
  function repositionGameItem() { // keeps the gameItems moving and tells them when and if they need to stop
    xPosition += xSpeed;
    yPosition += ySpeed;
    xPosition2 += xSpeed2;
    yPosition2 += ySpeed2;
    if (xPosition >= boardWidth) {
      xSpeed = 0;
    }
    if (yPosition >= boardHeight) {
      ySpeed = 0;
    }
    if (xPosition <= 0) {
      xSpeed = 0;
    }
    if (yPosition <= 0) {
      ySpeed = 0;
    }
    if (yPosition2 >= boardHeight) {
      ySpeed2 = 0;
    }
    if (xPosition2 >= boardWidth) {
      xSpeed2 = 0;
    }
    if (yPosition2 <= 0) {
      ySpeed2 = 0;
    }
    if (xPosition2 <= 0) {
      xSpeed2 = 0;
    }

  }
  function setBoundary() { // creates a boundary to keep the gameItems inside the box 
    if(xPosition > stopX){
      xPosition = stopX;
    }
    if(yPosition > stopY){
      yPosition = stopY;
    }
    if(xPosition2 > stopX){
      xPosition2 = stopX;
    }
    if(yPosition2 > stopY){
      yPosition2 = stopY;
    }
    if(xPosition < 0){
      xPosition = 0;
    }
    if(yPosition < 0){
      yPosition = 0;
    }
    if(xPosition2 < 0){
      xPosition2 = 0;
    }
    if(yPosition2 < 0){
      yPosition2 = 0;
    }

  }

  function redrawGameItem() { // gives the gameItems a respawn position
    $("#walker1").css("left", xPosition);
    $("#walker1").css("top", yPosition);
    $("#tag2").css("right", xPosition2);
    $("#tag2").css("top", yPosition2);
  }
}


