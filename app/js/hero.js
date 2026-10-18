/* ============================================================
   hero.js — Banner interactivo: red de commits / microservicios (canvas)
   Reacciona al mouse; los nodos «hash» recorren ramas de Git.
   ============================================================ */
(function () {
  EB.Hero = function (canvas) {
    const ctx = canvas.getContext('2d'); let W, H, nodes = [], mouse = { x: -999, y: -999 }, dpr = Math.min(2, window.devicePixelRatio || 1);
    const hex = () => Math.floor(Math.random() * 0xfffffff).toString(16).padStart(7, '0');
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function size() { const r = canvas.getBoundingClientRect(); W = r.width; H = r.height; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); init(); }
    function init() {
      const n = Math.max(26, Math.min(60, Math.floor(W * H / 22000)));
      nodes = Array.from({ length: n }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 2 + Math.random() * 2.4, big: i % 9 === 0, h: hex(), c: ['#22d3ee', '#39ff88', '#2563eb', '#a78bfa'][i % 4] }));
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (const a of nodes) {
        if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y); if (dm < 140 && !reduce) { a.x += (a.x - mouse.x) * .008; a.y += (a.y - mouse.y) * .008; }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 150) { ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 150) * .28})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      for (const a of nodes) {
        const near = Math.hypot(a.x - mouse.x, a.y - mouse.y) < 120;
        ctx.fillStyle = a.c; ctx.shadowColor = a.c; ctx.shadowBlur = a.big || near ? 16 : 6;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.big ? a.r + 2 : a.r, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
        if (a.big || near) { ctx.font = '11px "JetBrains Mono", monospace'; ctx.fillStyle = 'rgba(180,210,240,.75)'; ctx.fillText(a.h, a.x + 10, a.y + 4); }
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    canvas.parentElement.addEventListener('mousemove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = mouse.y = -999; });
    canvas.addEventListener('resize', size); window.addEventListener('resize', size);
    size(); frame();
  };
})();
