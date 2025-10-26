const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const W = canvas.width;
const H = canvas.height;

const fireworkSound = document.getElementById("fireworkSound");

// 🎇 Background City
function drawCitySky() {
  ctx.fillStyle = "#0a0a23";
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = "#88f";
    ctx.fillRect(Math.random() * W, Math.random() * H * 0.5, 2, 2);
  }
  for (let i = 0; i < 10; i++) {
    const w = 60;
    const h = 120 + Math.random() * 80;
    const x = i * (W / 10);
    const y = H - h;
    ctx.fillStyle = "#222";
    ctx.fillRect(x, y, w, h);
  }
  ctx.beginPath();
  ctx.arc(W - 80, 80, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#ccc";
  ctx.fill();
}

// 🎂 Cake
let cakeLevel = 0;
function drawCake() {
  const baseX = W / 2 - 60;
  const baseY = H - 120;
  for (let i = 0; i <= cakeLevel; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#f88" : "#fff";
    ctx.fillRect(baseX + i * 5, baseY - i * 30, 120 - i * 10, 30);
  }
}

// 🎆 Fireworks
let fireworks = [];
function triggerFirework() {
  for (let i = 0; i < 60; i++) {
    fireworks.push({
      x: W / 2,
      y: H / 2,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 5 + 2,
      size: 2 + Math.random() * 2,
      life: 0,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
  fireworkSound.play();
}
function drawFireworks() {
  fireworks.forEach(p => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.life++;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  fireworks = fireworks.filter(p => p.life < 50);
}

// 📝 Typewriter
let message = "สุขสันต์วันเกิด บัง พลอย ซู่ลิ่ง 🎉";
let typed = "";
let typeIndex = 0;
function drawTypewriter() {
  if (typeIndex < message.length) {
    typed += message[typeIndex++];
  }
  ctx.fillStyle = "#0f0";
  ctx.font = "28px 'Courier New'";
  ctx.textAlign = "center";
  ctx.fillText(typed, W / 2, H / 2 + 180);
}

// 🔁 Main
let step = 0;
let showText = false;

function animate() {
  ctx.clearRect(0, 0, W, H);
  drawCitySky();

  if (step < 60) drawCake();
  else if (step === 60) triggerFirework();

  if (step >= 60) drawFireworks();
  if (step > 100) showText = true;
  if (showText) drawTypewriter();

  requestAnimationFrame(animate);
  if (step <= 200) step++;
  if (step % 30 === 0 && cakeLevel < 3) cakeLevel++;
}

animate();
