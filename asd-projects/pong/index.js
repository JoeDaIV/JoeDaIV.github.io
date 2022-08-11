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
 // let runProgram = false;
 // let startButton;


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

  // variable pen

  var ball = GameObject("#ball");
  var leftPaddle = GameObject("#leftPaddle");
  var rightPaddle = GameObject("#rightPaddle");
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
  // movement interactions
  function handleKeyDown(event) { // sets the speed for objects when pressing a button
    if (event.which === keyLeft.W) {
      leftPaddle.speedY += -10;
    }
    else if (event.which === keyLeft.S) {
      leftPaddle.speedY += 10;
    }
    else if (event.which === keyRight.UP) {
      rightPaddle.speedY += -10;
    }
    else if (event.which === keyRight.DOWN) {
      rightPaddle.speedY += 10;
    }
  }

  function handleKeyUp(event) { // sets the speed for objects when releasing a button
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
    setBoundary(leftPaddle);
    setBoundary(rightPaddle);
    reDraw(leftPaddle);
    reDraw(rightPaddle);
    reDraw(ball);
    ballColision(ball);
    collision(ball, leftPaddle);
    collision(ball, rightPaddle);
    setPlace(winner1);
    setPlace(winner2);
  }
  /* 
   Called in response to events.
   */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startBall() { // sets the ball objects respawn point and initial speed
    ball.x = midPoint.across;
    ball.y = midPoint.down;

    ball.speedX = randomNum = (Math.random() * 5 + 3) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 5 + 3) * (Math.random() > 0.5 ? -1 : 1);
  }

  function moveObject(obj) { // sets speed for an object
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function ballColision(obj) { // makes the ball bounce and detects whether it has hit the goals
    stopY = BOARD_HEIGHT - $(obj.id).height();
    if (obj.x >= BOARD_WIDTH || obj.x <= 0) {
      obj.speedX = 0;
      bScore(ball);
    }
    if (ball.y >= stopY) {
      ball.y = stopY;
      ball.y -= ball.speedY;
      ball.speedY *= -1;
    }
    if (ball.y <= 0) {
      ball.y = 0;
      ball.y -= ball.speedY;
      ball.speedY *= -1;
    }


  }

  function bScore(obj) { // sets where the goals are and if hit gives the player a point
    if (obj.x >= BOARD_WIDTH) {
      update1Score = update1Score + 1; // updates player score
      $("#score1").text(update1Score); // updates player score text
      startBall(); // resets the ball
    }
    if (obj.x <= 0) {
      update2Score = update2Score + 1;
      $("#score2").text(update2Score);
      startBall();
    }
    if (update1Score === winNum) { // checks to see who wins
      $("#winner1").css({ // makes player1
      top: 0,
      left: 460
    }).text("Player 1 wins");
      endGame();
    }
    if (update2Score === winNum) { // checks to see who wins
      $("#winner2").css({ // makes player2
        top: 0,
        left: 460
     }).text("Player 2 wins");
      endGame();
      console.log($("#winner2"));
    }

  }


  function collision(obj1, obj2) { // bounces the ball away when it comes into contact with the paddles
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
  function setBoundary(obj) { // keeps the paddles in bounds
    var stopX = BOARD_WIDTH - $(obj.id).width();
    var stopY = BOARD_HEIGHT - $(obj.id).height();
    if (obj.y >= stopY) {
      obj.y = stopY;
    }
    if (obj.x >= stopX) {
      obj.x = stopX;
    }
    if (obj.y <= 0) {
      obj.y = 0;
    }
    if (obj.x <= 0) {
      obj.x = 0;
    }
  }

  function setPlace(obj){
    midPoint.across
    midPoint.down
  }

  function reDraw() { // makes a respawn position

    $(rightPaddle.id).css("top", rightPaddle.y);
    $(rightPaddle.id).css("left", rightPaddle.x);
    $(leftPaddle.id).css("top", leftPaddle.y);
    $(leftPaddle.id).css("left", leftPaddle.x);
    $(ball.id).css("top", ball.y);
    $(ball.id).css("left", ball.x);
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }


}