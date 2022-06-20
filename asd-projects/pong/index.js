/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  var x = parseFloat($("#leftPaddle").css("left"));
  var y = parseFloat($("#leftPaddle").css("top"));
  var width = $("#leftPaddle").width();
  var height = $("#leftPaddle").height();
  var speedY = 0;

  var x = parseFloat($("#rightPaddle").css("left"));
  var y = parseFloat($("#rightPaddle").css("top"));
  var width = $("#rightPaddle").width();
  var height = $("#rightPaddle").height(); 
  var speedY = 0;

  var x = parseFloat($("#ball").css("left"));
  var y = parseFloat($("#ball").css("top"));
  var width = $("#ball").width();
  var height = $("#ball").height();
  var speedY = 0;
  var speedX = 0;

  function gameItems(x, y, width, height){


  }


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {


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

}
