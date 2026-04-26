const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 14;
const cols = Math.floor(canvas.width / fontSize);

// generate terrain height map (mountains)
const terrain = [];
for (let i = 0; i < cols; i++) {
  const height =
    canvas.height * 0.5 +
    Math.sin(i * 0.15) * 120 +
    Math.sin(i * 0.05) * 80;

  terrain.push(height);
}

// river path (center valley)
const riverWidth = 120;

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ffcc";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < cols; i++) {
    const x = i * fontSize;
    const y = terrain[i];

    // MOUNTAIN: draw binary along terrain ridge
    const text = Math.random() > 0.5 ? "0" : "1";
    ctx.fillText(text, x, y);

    // RIVER: flowing downward particles in valley
    const riverCenter = canvas.width / 2;
    if (Math.abs(x - riverCenter) < riverWidth) {
      const flowY = (Date.now() / 10 + i * 20) % canvas.height;

      ctx.fillStyle = "#0099ff";
      ctx.fillText(text, x, flowY);
      ctx.fillStyle = "#00ffcc";
    }
  }
}

setInterval(draw, 40);