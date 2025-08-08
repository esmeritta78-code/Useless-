function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Enable blue glow
  ctx.shadowColor = "rgba(0, 200, 255, 0.7)";
  ctx.shadowBlur = 8;

  // Draw each particle filled in blue
  ctx.fillStyle = "rgba(0, 150, 255, 0.8)";
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // Disable glow for lines
  ctx.shadowBlur = 0;

  // Draw connecting lines between close particles
  ctx.strokeStyle = "rgba(0, 200, 255, 0.2)";
  particles.forEach((p, i) => {
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x,
        dy = p.y - p2.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        ctx.lineWidth = (1 - dist / 120) * 2; // thinner lines for distant particles
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });

  // Update positions and bounce off edges
  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });

  requestAnimationFrame(animateParticles);
}
