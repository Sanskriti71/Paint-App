const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - document.querySelector(".toolbar").offsetHeight;

let painting = false;
let color = document.getElementById("color").value;
let size = document.getElementById("size").value;

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;

  ctx.lineTo(e.clientX, e.clientY - document.querySelector(".toolbar").offsetHeight);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY - document.querySelector(".toolbar").offsetHeight);
}


canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

document.getElementById("color").addEventListener("input", (e) => {
  color = e.target.value;
});

document.getElementById("size").addEventListener("input", (e) => {
  size = e.target.value;
});

document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("eraser").addEventListener("click", () => {
  color = "#FFFFFF"; 
});

document.getElementById("save").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL();
  link.click();
});

document.getElementById("dark-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
