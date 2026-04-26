const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let width;
let height;
let cols;
let terrain = [];
let riverParticles = [];

const fontSize = 14;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  cols = Math.floor(width / fontSize);

  buildTerrain();
  buildRiverParticles();
}

function buildTerrain() {
  terrain = [];

  for (let i = 0; i < cols; i++) {
    const base =
      height * 0.55 +
      Math.sin(i * 0.08) * 90 +
      Math.sin(i * 0.19) * 45 +
      Math.sin(i * 0.035) * 120;

    terrain.push(base);
  }
}

function buildRiverParticles() {
  riverParticles = [];

  for (let i = 0; i < 150; i++) {
    riverParticles.push({
      x: width / 2 + (Math.random() - 0.5) * 220,
      y: Math.random() * height,
      speed: 1 + Math.random() * 2.5,
      drift: (Math.random() - 0.5) * 0.8,
      char: Math.random() > 0.5 ? "1" : "0"
    });
  }
}

function drawBackgroundFade() {
  ctx.fillStyle = "rgba(2, 4, 3, 0.18)";
  ctx.fillRect(0, 0, width, height);
}

function drawMountains() {
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < cols; i++) {
    const x = i * fontSize;
    const ridgeY = terrain[i];

    for (let y = ridgeY; y < height; y += fontSize * 1.25) {
      const depth = (y - ridgeY) / (height - ridgeY);
      const flicker = Math.random() > 0.45;

      if (flicker) {
        ctx.fillStyle = `rgba(0, 255, 204, ${0.42 - depth * 0.28})`;
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y);
      }
    }
  }
}

function drawRidgeGlow() {
  ctx.beginPath();

  for (let i = 0; i < cols; i++) {
    const x = i * fontSize;
    const y = terrain[i];

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = "rgba(0, 255, 204, 0.65)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "rgba(0, 255, 204, 0.8)";
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function drawRiver() {
  ctx.font = `${fontSize}px monospace`;

  riverParticles.forEach((p) => {
    const perspective = p.y / height;
    const riverWidth = 40 + perspective * 280;
    const centerWave = Math.sin(p.y * 0.018 + Date.now() * 0.002) * 45;
    const centerX = width / 2 + centerWave;

    p.y += p.speed;
    p.x += p.drift + Math.sin(p.y * 0.025) * 0.25;

    if (p.y > height + 20) {
      p.y = height * 0.48 + Math.random() * 60;
      p.x = width / 2 + (Math.random() - 0.5) * 80;
      p.char = Math.random() > 0.5 ? "1" : "0";
    }

    if (Math.abs(p.x - centerX) > riverWidth / 2) {
      p.x += (centerX - p.x) * 0.03;
    }

    ctx.fillStyle = `rgba(0, 153, 255, ${0.35 + perspective * 0.45})`;
    ctx.fillText(p.char, p.x, p.y);
  });
}

function drawHorizonMist() {
  const gradient = ctx.createLinearGradient(0, height * 0.35, 0, height);
  gradient.addColorStop(0, "rgba(0, 255, 204, 0.04)");
  gradient.addColorStop(0.45, "rgba(0, 153, 255, 0.08)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.35)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function animate() {
  drawBackgroundFade();
  drawMountains();
  drawRidgeGlow();
  drawRiver();
  drawHorizonMist();

  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();