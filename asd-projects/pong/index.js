/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  // Game Item Objects
  // debugger;
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

  var ball = GameObject("#ball");
  var leftPaddle = GameObject("#leftPaddle");
  var rightPaddle = GameObject("#rightPaddle");
  console.log(ball, leftPaddle, rightPaddle);
  var stopX = BOARD_WIDTH - $("#obj").width();
  var stopY = BOARD_HEIGHT - $("#obj").height();
  var updateScore = score++;
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
  startBall();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 

  function handleKeyDown(event) {
    if (event.which === keyLeft.W) {
      leftPaddle.speedY += -12;
    }
    else if (event.which === keyLeft.S) {
      leftPaddle.speedY += 12;
    }
    else if (event.which === keyRight.UP) {
      rightPaddle.speedY += -12;
    }
    else if (event.which === keyRight.DOWN) {
      rightPaddle.speedY += 12;
    }
  }

  function handleKeyUp(event) {
    if (event.which === keyLeft.W) {
      leftPaddle.speedY = 0;
    }
    if (event.which === keyLeft.S) {
      leftPaddle.speedY = 0;
    }
    if (event.which === keyRight.UP) {
      rightPaddle.speedY = 0;
    }
    if (event.which === keyRight.DOWN) {
      rightPaddle.speedY = 0;
    }
  }


  /* 
   On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
   by calling this function and executing the code inside.
   */
  function newFrame() {
    moveObject(leftPaddle);
    moveObject(ball);
    moveObject(rightPaddle);
    // repositionGameItem();
    reDraw();
    wallColision(leftPaddle);
    wallColision(ball);
    wallColision(rightPaddle);
    setBoundary(leftPaddle);
    setBoundary(rightPaddle);
    setBoundary(ball);
    collision(leftPaddle);
    collision(rightPaddle);
    collision(ball);
  }
  /* 
   Called in response to events.
   */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    leftPaddle.y += leftPaddle.speedY;
    rightPaddle.y += rightPaddle.speedY;
  }

  function startBall() {
    ball.y = ball.y;
    ball.x = ball.x;
    ball.speedX = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveObject(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function wallColision(obj) {
    if (obj.y >= BOARD_HEIGHT) {
      obj.speedY = 0;
    }
    if (obj.x >= BOARD_WIDTH) {
      obj.speedX = 0;
    }
    if (obj.y <= 0) {
      obj.speedY = 0;
    }
    if (obj.x <= 0) {
      obj.speedX = 0;
    }
    
  }
  function collision(obj) {
    obj.right = obj.x + obj.width;
    obj.left = obj.x;
    obj.top = obj.y;
    obj.bottom = obj.y + obj.height;

    if (obj.right > obj.left && obj.left < obj.right &&
      obj.top < obj.bottom && obj.bottom > obj.top) {
    } else {
      false;
    }
  }
  function setBoundary(obj) {
    if(obj.y > stopY){
      obj.y = stopY;
    }
    if(obj.x > stopX){
      obj.x = stopX;
    }
    if(obj.y < 0){
      obj.y = 0;
    }
    if(obj.x < 0){
      obj.x = 0;
    }
  }

  function reDraw() {

    $(rightPaddle.id).css("top", rightPaddle.y);
    $("#rightPaddle").css("left", rightPaddle.x);
    $(leftPaddle.id).css("top", leftPaddle.y);
    $(leftPaddle.id).css("left", leftPaddle.x);
    $("#ball").css("top", ball.y);
    $("#ball").css("left", ball.x);
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
