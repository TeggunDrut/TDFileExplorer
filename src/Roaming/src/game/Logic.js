function getRectanglesCollided(a1, a2) {
  if (
    a1.x + a1.w <= a2.x + a2.w &&
    a1.x >= a2.x &&
    a1.y + a1.h <= a2.y + a2.h &&
    a1.y >= a2.y
  ) {
    return true;
  } else {
    return false;
  }
}

function drawRay(x, y, x2, y2, c) {
  ctx.beginPath();
  ctx.strokeStyle = c;
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

const times = [];

function refreshLoop() {
  window.requestAnimationFrame(() => {
    let now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    // refreshLoop();
  });
}

// refreshLoop();
