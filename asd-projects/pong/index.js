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
  var midPoint = {
    down: BOARD_HEIGHT / 2,
    across: BOARD_WIDTH / 2
  }
  var winNum = 10;
  var update1Score = 0;
  var update2Score = 0;
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
    collision(ball, leftPaddle);
    collision(ball, rightPaddle);
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
    ball.x = midPoint.across;
    ball.y = midPoint.down;

    ball.speedX = randomNum = (Math.random() * 5 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 5 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveObject(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function wallColision(obj) {
    if (obj.y >= BOARD_HEIGHT || obj.y <= 0) {
      obj.speedY = 0;
    }
    if (obj.x >= BOARD_WIDTH || obj.x <= 0) {
      obj.speedX = 0;
      bScore(ball);
    }
    if (ball.y >= BOARD_HEIGHT || ball.y <= 0) {
      ball.y -= ball.speedY;
      ball.speedY *= -1;
    }

  }

  function bScore(obj) { // 
    if (obj.x >= BOARD_WIDTH) {
      update1Score = update1Score + 1;
      $("#score1").text(update1Score);
      startBall();
      //  console.log(5);
    }
    if (obj.x <= 0) {
      update2Score = update2Score + 1;
      $("#score2").text(update2Score);
      startBall();
      //  console.log(7);
    }
    if (update1Score === winNum) {
      $("#winner1").css({
        top: 0,
        left: 200
      }).text("Player 1 wins");
      endGame();
      console.log($("#winner1"));
    }
    if (update2Score === winNum) {
      $("#winner2").css({
        top: 0,
        left: 200
      }).text("Player 2 wins");
      endGame();
      console.log($("#winner2"));
    }

  }


  function collision(obj1, obj2) { // bounces the ball away when it comes into contact with the ball
    obj1.right = obj1.x + obj1.width;
    obj1.left = obj1.x;
    obj1.top = obj1.y;
    obj1.bottom = obj1.y + obj1.height;
    obj2.right = obj2.x + obj2.width;
    obj2.left = obj2.x;
    obj2.top = obj2.y;
    obj2.bottom = obj2.y + obj2.height;

    if (obj1.right > obj2.left && obj1.left < obj2.right &&
      obj1.top < obj2.bottom && obj1.bottom > obj2.top) {

      ball.speedX *= -1;
    }



  }
  function setBoundary(obj) { // keeps the objects in bounds
    var stopBX = BOARD_WIDTH - $("#ball").width();
    var stopBY = BOARD_HEIGHT - $("ball").height();
    var stopLX = BOARD_WIDTH - $("#leftPaddle").width();
    var stopLY = BOARD_HEIGHT - $("#leftPaddle").height();
    var stopRX = BOARD_WIDTH - $("#rightPaddle").width();
    var stopRY = BOARD_HEIGHT - $("#rightPaddle").height();
    if (ball.y >= stopBY) {
      ball.y = stopBY;
    }
    if (leftPaddle.y >= stopLY) {
      leftPaddle.y = stopLY;
    }
    if (rightPaddle.y >= stopRY) {
      rightPaddle.y = stopRY;
    }
    if (rightPaddle.x >= stopRX) {
      rightPaddle.x = stopRX;
    }
    if (leftPaddle.x >= stopLX) {
      leftPaddle.x = stopLX;
    }
    if (ball.x >= stopBX) {
      ball.x = stopBX;
    }
    if (ball.y <= 0) {
      ball.y = 0;
    }
    if (rightPaddle.y <= 0) {
      rightPaddle.y = 0;
    }
    if (leftPaddle.y <= 0) {
      leftPaddle.y = 0;
    }
    if (ball.x <= 0) {
      ball.x = 0;
    }
    if (leftPaddle.x <= 0) {
      leftPaddle.x = 0;
    }
    if (rightPaddle.x <= 0) {
      rightPaddle.x = 0;
    }
  }

  function reDraw() { // makes a respawn position

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