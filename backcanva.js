//background canvas
//multicolor balls that increase in radius when mouse is hovered over them
var canvas1 = document.getElementById("canvas1");
var ctx = canvas1.getContext("2d");
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;
var minRadius = 8;
var maxRadius = 50;
var x;
var dx;
var y;
var dy;
var radius;

//array of colors
var colorArray = ["#99ff99", "#99ccff", "#ff99cc", "#ff6666"];

//mouse pointer position
var mouse = { x: undefined, y: undefined };

//event listener to get mouse position
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = minRadius;
  }

  //draw a circle object on canvas
  draw() {
    ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
    ctx.strokeStyle = "#289347";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  //update position of balls
  //update radius of balls when mouse is hovered
  update() {
    if (this.x + this.radius > canvas1.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas1.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius = this.radius + 2;
      }
    } else {
      this.radius = minRadius;
    }

    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    this.draw();
  }
}

var circleArray = [];
var length = 600;
var i;

//create balls
function create() {
  for (i = 0; i < length; i++) {
    x = Math.random() * canvas1.width;
    y = Math.random() * canvas1.height;
    dx = (Math.random() - 0.5) * 2;
    dy = (Math.random() - 0.5) * 2;
    radius = minRadius;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

//animated frame
function animate() {
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  for (i = 0; i < length; i++) {
    circleArray[i].update();
  }

  window.requestAnimationFrame(animate);
}

create();
animate();
