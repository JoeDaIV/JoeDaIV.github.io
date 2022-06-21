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

  function GameObject($id) {
    var obj = {};
    obj.id = $id;
    obj.x = parseFloat($($id).css("left"));
    obj.y = parseFloat($($id).css("top"));
    obj.width = $($id).width();
    obj.height = $($id).height();
    obj.color = $($id).css("background-color");
    obj.speedY = 0;
    obj.speedX = 0;
    return obj;
  }

  var ball = GameObject("#ball", "220px", "220px", "20px", "20px", "red", 10, 10);
  var leftPaddle = GameObject("#leftPaddle", "0px", "220px", "20px", "80px", "mid-night blue", 0);
  var rightPaddle = GameObject("#rightPaddle", "440px", "220px", "20px", "80px", "scarlet", 0);


  var keyRight = {
    UP: 38,
    DOWN: 40
  }
  var keyLeft = {
    W: 87,
    S: 83
  }


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDown);
  $(document).on("keyup", handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {
    if(event.which === keyLeft.W){
      leftPaddle.speedY = leftPaddle.y + -12;
    console.log(52);
    }
    if(event.which === keyLeft.S){
      leftPaddle.speedY += 12;
    }
    if(event.which === keyRight.UP){
      rightPaddle.speedY += -12;
    }
    if(event.which === keyRight.DOWN){
      rightPaddle.speedY += 12;
      console.log(25);
    }
  }
  
  function handleKeyUp(){}

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    GameObject();


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
