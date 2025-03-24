//Hecho por Christian Rodriguez Moreno y Alma Delia Vargas Gonzalez
//Ping-pong
let ball;
let colors = ["white"];
let keys = {};
let score1 = 0;
let score2 = 0;
let gameOver = false;
let winningScore = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);

  paddle1 = {
    x: 20,
    y: height / 2 - 50,
    w: 50,
    h: 200,
    speed: 15
  };
  
  paddle2 = {
    x: width - 70,
    y: height / 2 - 50,
    w: 50,
    h: 200,
    speed: 15
  };
  
  resetBall();
}

function draw() {
  background("black");

  textSize(32);
  fill("white");
  textAlign(CENTER, TOP);
  text(`${score1} - ${score2}`, width / 2, 20);

  if (gameOver) {
    textSize(64);
    textAlign(CENTER, CENTER);
    text(score1 === winningScore ? "¡Jugador 1 gana!" : "¡Jugador 2 gana!", width / 2, height / 2);
    return;
  }


  fill("white");
  rect(paddle1.x, paddle1.y, paddle1.w, paddle1.h);
  rect(paddle2.x, paddle2.y, paddle2.w, paddle2.h);
  
  fill(ball.color);
  ellipse(ball.x, ball.y, ball.radius * 2);

  ball.x += ball.vx;
  ball.y += ball.vy;
  
  if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= height) {
    ball.vy *= -1;
  }

  if (ball.x - ball.radius < paddle1.x + paddle1.w &&
      ball.y > paddle1.y &&
      ball.y < paddle1.y + paddle1.h) {
    ball.vx *= -1.1;
    ball.x = paddle1.x + paddle1.w + ball.radius;
  }

  if (ball.x + ball.radius > paddle2.x &&
      ball.y > paddle2.y &&
      ball.y < paddle2.y + paddle2.h) {
    ball.vx *= -1.1;
    ball.x = paddle2.x - ball.radius;
  }

  if (ball.x - ball.radius <= 0) {
    score2++;
    checkGameOver();
    resetBall();
  }

  if (ball.x + ball.radius >= width) {
    score1++;
    checkGameOver();
    resetBall();
  }

  if (keys["w"] && paddle1.y > 0) paddle1.y -= paddle1.speed;
  if (keys["s"] && paddle1.y + paddle1.h < height) paddle1.y += paddle1.speed;

  if (keys["ArrowUp"] && paddle2.y > 0) paddle2.y -= paddle2.speed;
  if (keys["ArrowDown"] && paddle2.y + paddle2.h < height) paddle2.y += paddle2.speed;
}

function keyPressed() {
  keys[key] = true;
}

function keyReleased() {
  keys[key] = false;
}

function windowResized() {
  setup();
}

function resetBall() {
  ball = {
    x: width / 2,
    y: height / 2,
    vx: random([-3, 3]),
    vy: random(-2, 2),
    radius: 35,
    color: random(colors)
  };
}

function checkGameOver() {
  if (score1 === winningScore || score2 === winningScore) {
    gameOver = true;
    setTimeout(() => {
      restartGame();
    }, 3000);
  }
}

function restartGame() {
  score1 = 0;
  score2 = 0;
  gameOver = false;
  resetBall();
}
