
//Hecho por Christian Rodriguez Moreno y Alma Delia Vargas Gonzalez
//Ping-pong
let ball;
let colors = ["white"];

let paddle1 = {
  x: 20,
  y: 150,
  w: 15,
  h: 80,
  speed: 5
};

let paddle2 = {
  x: 365,
  y: 150,
  w: 15,
  h: 80,
  speed: 5
};

let keys = {};

function setup() {
  createCanvas(400, 400);
  ball = {
    x: width / 2,
    y: height / 2,
    vx: random([-3, 3]),
    vy: random(-2, 2),
    radius: 15,
    color: random(colors)
  };
}

function draw() {
  background("black");

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
    ball.vx *= -1;
    ball.x = paddle1.x + paddle1.w + ball.radius;
  }

  if (ball.x + ball.radius > paddle2.x &&
      ball.y > paddle2.y &&
      ball.y < paddle2.y + paddle2.h) {
    ball.vx *= -1;
    ball.x = paddle2.x - ball.radius;
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