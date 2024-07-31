// variables

const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const clearBtn = document.getElementById("clear");
const colorPicker = document.getElementById("colorPicker");

const ctx = canvas.getContext("2d");
let painting = false;
let x;
let y;
let color = colorPicker.value;
let size = 15;
const MAX_SIZE = 25;
const MIN_SIZE = 5;

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// logic

function startPosition(e) {
  painting = true;
  x = e.offsetX;
  y = e.offsetY;
}

function endPosition() {
  painting = false;
  x = undefined;
  y = undefined;
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function draw(e) {
  if (!painting) return;

  const x2 = e.offsetX;
  const y2 = e.offsetY;

  drawCircle(x2, y2);
  drawLine(x, y, x2, y2);

  x = x2;
  y = y2;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// events

canvas.addEventListener("mousedown", startPosition);
document.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > MAX_SIZE) size = MAX_SIZE;
});
decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < MIN_SIZE) size = MIN_SIZE;
});
clearBtn.addEventListener("click", clearCanvas);
colorPicker.addEventListener("change", (e) => (color = e.target.value));
