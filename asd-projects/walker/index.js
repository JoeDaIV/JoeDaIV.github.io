/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
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
  var yPosition = 0;
  var xSpeed = 0;
  var ySpeed = 0;
  var board = jQuery("#board");
  var boardWidth = board.width();
  var boardHeight = board.height();
     
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // core logic 
  function handleKeyDown(event){
    if(event.which === keyRight.UP){
      ySpeed = -5;
      // console.log("Up arrow pressed");
    }
    else if(event.which === keyRight.DOWN) {
      ySpeed = 5;
      // console.log("Down arrow pressed");
    }
    else if(event.which === keyRight.LEFT) {
      xSpeed = -5;
      // console.log("Left arrow pressed");
    }
    else if(event.which === keyRight.RIGHT) {
      xSpeed = 5;
      //console.log("Right arrow pressed");
    }
    else if(event.which === keyLeft.A){
      xSpeed = -5;
    }
    else if(event.which === keyLeft.D){
      xSpeed = 5;
    }
    else if(event.which === keyLeft.W){
      ySpeed = -5;
    }
    else if(event.which === keyLeft.S){
      ySpeed = 5;
    }

  }
  function handleKeyUp(event) {
    if(keyRight.UP === event.which) {
      ySpeed = 0;
    } else{
      ySpeed = -5;
    }
    if(keyRight.DOWN === event.which) {
      ySpeed = 0;
    } else{
      ySpeed = 5;
    }
    if(keyRight.LEFT === event.which){
      xSpeed = 0;
    } else {
      xSpeed = -5;
    }
    if(keyRight.RIGHT === event.which){
      xSpeed = 0;
    } else {
      xSpeed = 5;
    }
    if(keyLeft.W === event.which){
      ySpeed = 0;
    } else{
      ySpeed = -5;
    }
    if(keyLeft.S === event.which) {
      ySpeed = 0;
    } else{
      ySpeed = 5;
    }
    if(keyLeft.A === event.which){
      xSpeed = 0;
    } else {
      xSpeed = -5;
    }
    if(keyLeft.D === event.which){
      xSpeed = 0;
    } else{
      xSpeed = 5;
    }
  }

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    redrawGameItem();
    repositionGameItem();

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
  function repositionGameItem() {
    xPosition += xSpeed;
    yPosition += ySpeed;
    if(xPosition >= boardWidth) {
      xSpeed *= -1;
    }
    if(yPosition >= boardHeight) {
      ySpeed *= -1;
    }
    if(yPosition <= 1) {
      ySpeed *= -1;
    }
    if(xPosition <= 1) {
      xSpeed *= -1;
    }

  }
  
  function redrawGameItem() {
    $("#walker1").css("left", xPosition);
    $("#walker1").css("top", yPosition);
    $("#tag2").css("right", xPosition);
    $("#tag2").css("top", yPosition);
  }
}
