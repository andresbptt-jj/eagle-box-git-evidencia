/* ============================================================
   diagrams.js — Diagramas SVG interactivos (flujo Git + arquitectura Eagle Box)
   ============================================================ */
(function () {
  const C = { panel: '#0f1829', panel2: '#131f35', line: '#2a3b5c', cyan: '#22d3ee', green: '#39ff88', blue: '#2563eb', amber: '#fbbf24', text: '#e6edf7', muted: '#8a9bb8', violet: '#a78bfa', red: '#ff5f6d' };
  const defs = `<defs>
    <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.cyan}"/></marker>
    <marker id="arg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.green}"/></marker>
    <marker id="aro" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.amber}"/></marker>
    <linearGradient id="gcl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b2a6b"/><stop offset="1" stop-color="#0a1830"/></linearGradient>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="#1b2a47"/></pattern></defs>`;
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" fill="${o.c || C.text}" font-size="${o.s || 14}" font-weight="${o.w || 500}" text-anchor="${o.a || 'middle'}" ${o.m ? 'class="mono"' : ''} ${o.ls ? `letter-spacing="${o.ls}"` : ''} ${o.h ? 'stroke="#0a1424" stroke-width="7" paint-order="stroke" stroke-linejoin="round"' : ''}>${s}</text>`;
  const ico = {
    folder: (x, y) => `<path transform="translate(${x},${y})" d="M2 6a3 3 0 0 1 3-3h6l3 3h10a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z" fill="none" stroke="${C.cyan}" stroke-width="1.8"/>`,
    stage: (x, y) => `<g transform="translate(${x},${y})" fill="none" stroke="${C.amber}" stroke-width="1.8"><rect x="2" y="3" width="24" height="6" rx="2"/><rect x="2" y="12" width="24" height="6" rx="2"/><rect x="2" y="21" width="24" height="6" rx="2" stroke-dasharray="3 3"/></g>`,
    db: (x, y) => `<g transform="translate(${x},${y})" fill="none" stroke="${C.green}" stroke-width="1.8"><ellipse cx="14" cy="6" rx="11" ry="4"/><path d="M3 6v16c0 2.2 5 4 11 4s11-1.8 11-4V6"/><path d="M3 14c0 2.2 5 4 11 4s11-1.8 11-4"/></g>`,
    cloud: (x, y) => `<path transform="translate(${x},${y}) scale(1.2)" d="M20 20a6 6 0 0 0 0-12 8 8 0 0 0-15 2 5 5 0 0 0 1 10Z" fill="none" stroke="${C.violet}" stroke-width="1.8"/>`
  };
  const box = (id, x, y, w, h, o = {}) => `<g class="node" data-k="${id}"><rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${o.f || C.panel2}" stroke="${o.s || C.line}" stroke-width="1.5"/>${o.inner || ''}</g>`;

  /* ---------- 1) Flujo Git: local vs remoto ---------- */
  function flowSVG() {
    const y = 165;
    const arrow = (x1, x2, yy, label, o = {}) => `<line x1="${x1}" y1="${yy}" x2="${x2}" y2="${yy}" stroke="${o.c || C.cyan}" stroke-width="2.2" marker-end="url(#${o.m || 'ar'})" ${o.dash ? 'stroke-dasharray="6 5"' : ''}/>` +
      `<g class="node" data-k="${o.k}">${T((x1 + x2) / 2, yy - 10, label, { m: 1, s: 13, c: o.c || C.cyan, w: 600, h: 1 })}</g>`;
    return `<svg class="diagram" viewBox="0 0 1100 400" role="img" aria-label="Diagrama del flujo de Git: Working Directory, Staging Area, Repositorio local y Remoto en GitHub">${defs}
      <rect width="1100" height="400" fill="url(#dots)" opacity=".8"/>
      <rect x="14" y="30" width="770" height="330" rx="20" fill="#0a1424" stroke="${C.blue}" stroke-width="1.5" stroke-dasharray="7 6"/>
      ${T(34, 58, 'ENTORNO LOCAL  ·  tu computador', { a: 'start', m: 1, s: 12, c: C.blue, w: 700, ls: 1.5 })}
      <rect x="826" y="30" width="262" height="330" rx="20" fill="#0d1030" stroke="${C.violet}" stroke-width="1.5" stroke-dasharray="7 6"/>
      ${T(846, 58, 'ENTORNO REMOTO  ·  nube', { a: 'start', m: 1, s: 12, c: C.violet, w: 700, ls: 1.5 })}
      ${box('wd', 40, 100, 180, 130, { inner: ico.folder(66, 118) + T(130, 172, 'Working', { w: 700, s: 15 }) + T(130, 191, 'Directory', { w: 700, s: 15 }) + T(130, 214, 'kotlin.txt (editado)', { m: 1, s: 11, c: C.muted }) })}
      ${box('stage', 300, 100, 180, 130, { inner: ico.stage(386, 118) + T(390, 172, 'Staging Area', { w: 700, s: 15 }) + T(390, 191, '(index)', { s: 13, c: C.muted }) + T(390, 214, 'cambios preparados', { m: 1, s: 11, c: C.muted }) })}
      ${box('repo', 560, 100, 180, 130, { inner: ico.db(636, 118) + T(650, 172, 'Local Repository', { w: 700, s: 15 }) + T(650, 191, '.git / commits', { s: 13, c: C.muted }) + T(650, 214, 'a3f9c21 · 7c1e4b0', { m: 1, s: 11, c: C.green }) })}
      ${box('remote', 856, 100, 202, 130, { f: 'url(#gcl)', s: C.violet, inner: ico.cloud(940, 112) + T(957, 172, 'GitHub (nube)', { w: 700, s: 15 }) + T(957, 191, 'remotos: github · origin', { m: 1, s: 11, c: C.violet }) + T(957, 214, `${EB.user.ghUser}/${EB.user.repo}`, { m: 1, s: 10, c: C.muted }) })}
      ${arrow(220, 300, y, 'git add', { k: 'add' })}
      ${arrow(480, 560, y, 'commit', { k: 'commit', c: C.green, m: 'arg' })}
      ${arrow(740, 856, y, 'git push', { k: 'push', c: C.amber, m: 'aro' })}
      <path d="M856 205 H740" stroke="${C.violet}" stroke-width="2" marker-end="url(#ar)" fill="none" stroke-dasharray="6 5" />${T(798, 196, 'fetch', { m: 1, s: 12, c: C.violet, w: 600, h: 1 })}
      <path d="M650 232 V262 H180 V234" stroke="${C.muted}" stroke-width="2" marker-end="url(#ar)" fill="none" stroke-dasharray="6 5" /><g class="node" data-k="restore">${T(415, 282, 'git restore / checkout', { m: 1, s: 12, c: C.muted, w: 600 })}</g>
      <path d="M957 232 V318 H100 V234" stroke="${C.violet}" stroke-width="2.2" fill="none" marker-end="url(#ar)"/>
      <g class="node" data-k="pull">${T(545, 340, 'git pull  =  fetch + merge', { m: 1, s: 13, c: C.violet, w: 700 })}</g>
      <circle id="packet" cx="-30" cy="${y}" r="7" fill="${C.green}" filter="drop-shadow(0 0 8px ${C.green})"/>
      ${T(550, 388, 'Haz clic en cada caja o flecha para ver qué ocurre', { s: 12, c: C.muted })}
    </svg>`;
  }
  const flowInfo = {
    wd: ['Working Directory', 'Carpeta de trabajo donde editas archivos. Git detecta qué cambió (<code>git status</code>). Aquí se crea <code>kotlin.txt</code> con <code>echo</code>.'],
    stage: ['Staging Area (index)', 'Zona intermedia donde se <b>preparan</b> los cambios que irán en el próximo commit. <code>git add .</code> mueve todo lo modificado aquí.'],
    repo: ['Local Repository', 'Base de datos de commits en <code>.git</code>. <code>git commit -m "Añadido datos."</code> guarda una instantánea inmutable con autor, fecha y hash (<code>a3f9c21</code>).'],
    remote: ['Remoto en GitHub', 'Copia del repositorio en la nube: respaldo, colaboración, Pull Requests y CI/CD. Se referencia con alias (<code>github</code>, <code>origin</code>) → <code>git remote -v</code>.'],
    add: ['git add', 'Working Directory → Staging Area. Selecciona qué cambios entran al siguiente commit.'],
    commit: ['git commit', 'Staging Area → Repositorio local. Crea el commit con el mensaje; todavía <b>no</b> está en GitHub.'],
    push: ['git push', 'Repositorio local → Remoto. <code>git push origin master</code> sube los commits nuevos a GitHub.'],
    pull: ['git pull', 'Remoto → tu copia local: combina <code>git fetch</code> (descargar) + <code>git merge</code> (integrar). Mantiene al equipo sincronizado.'],
    restore: ['git restore / checkout', 'Recupera archivos o cambia de rama desde el repositorio local hacia el Working Directory.']
  };

  /* ---------- 2) Arquitectura Eagle Box ---------- */
  const SERVICES = [
    ['auth', 'Auth & Usuarios', 'eagle-box/auth-service', 'Kotlin · Spring Boot', 'JWT, roles (cliente, repartidor, operador).'],
    ['orders', 'Pedidos', 'eagle-box/orders-service', 'Kotlin · Spring Boot', 'Creación, estados y asignación de entregas.'],
    ['routes', 'Rutas & Despacho', 'eagle-box/routing-service', 'Python · FastAPI', 'Optimización de rutas de última milla.'],
    ['track', 'Tracking GPS', 'eagle-box/tracking-service', 'Kotlin · WebSocket', 'Ubicación en tiempo real del repartidor.'],
    ['notif', 'Notificaciones', 'eagle-box/notify-service', 'Node.js', 'Push, SMS y correo al cliente.']
  ];
  function archSVG() {
    const sx = 500, sy = 44, sh = 42, gap = 10;
    const svc = SERVICES.map((s, i) => box(s[0], sx, sy + i * (sh + gap), 210, sh, { inner: T(sx + 105, sy + i * (sh + gap) + 26, s[1], { w: 600, s: 14 }) })).join('');
    const clients = [['Android', 'App Repartidor (Kotlin)'], ['web', 'Panel Operador (Web)'], ['cli', 'App Cliente · tracking']].map((c, i) => box('c_' + c[0], 34, 84 + i * 70, 220, 52, { inner: T(144, 115 + i * 70, c[1], { w: 600, s: 13.5 }) })).join('');
    const data = [['PostgreSQL', C.green], ['Redis · caché', C.red], ['RabbitMQ · eventos', C.amber]].map((d, i) => box('d_' + i, 850, 84 + i * 70, 216, 52, { inner: `<circle cx="874" cy="${110 + i * 70}" r="6" fill="${d[1]}"/>` + T(962, 115 + i * 70, d[0], { w: 600, s: 13.5 }) })).join('');
    const links = SERVICES.map((s, i) => `<line x1="${sx + 210}" y1="${sy + i * (sh + gap) + 21}" x2="850" y2="${110 + (i % 3) * 70}" stroke="#223555" stroke-width="1.3"/>`).join('');
    const clientLinks = [0, 1, 2].map(i => `<line x1="254" y1="${110 + i * 70}" x2="330" y2="212" stroke="${C.cyan}" stroke-width="1.6" marker-end="url(#ar)"/>`).join('');
    const gw = `<line x1="450" y1="212" x2="500" y2="212" stroke="${C.cyan}" stroke-width="2"/>` + SERVICES.map((s, i) => `<line x1="478" y1="${sy + i * (sh + gap) + 21}" x2="500" y2="${sy + i * (sh + gap) + 21}" stroke="${C.cyan}" stroke-width="1.5"/>`).join('') + `<line x1="478" y1="${sy + 21}" x2="478" y2="${sy + 4 * (sh + gap) + 21}" stroke="${C.cyan}" stroke-width="1.5"/>`;
    const repoY = 372;
    const repos = SERVICES.map((s, i) => { const x = 40 + i * 132; return `<g class="node" data-k="r_${s[0]}"><rect class="box" x="${x}" y="${repoY}" width="122" height="44" rx="10" fill="${C.panel}" stroke="${C.line}" stroke-width="1.3"/>${T(x + 61, repoY + 19, s[0] + '-service', { m: 1, s: 10.5, c: C.green })}${T(x + 61, repoY + 34, 'repo · main', { m: 1, s: 9.5, c: C.muted })}</g>`; }).join('');
    const vlinks = SERVICES.map((s, i) => `<path d="M${sx + 105} ${sy + i * (sh + gap) + sh} V${sy + i * (sh + gap) + sh + 0}" />`).join('');
    const dashed = `<path d="M${sx} 120 H420 V${repoY - 18} H${40 + 61}" stroke="${C.green}" stroke-width="1.3" fill="none" stroke-dasharray="4 5" opacity=".0"/>`;
    return `<svg class="diagram" viewBox="0 0 1100 560" role="img" aria-label="Arquitectura de microservicios de Eagle Box y su relación con repositorios Git y CI/CD">${defs}
      <rect width="1100" height="560" fill="url(#dots)" opacity=".8"/>
      ${T(144, 40, 'CLIENTES', { m: 1, s: 12, c: C.cyan, w: 700, ls: 2 })}${T(604, 28, 'MICROSERVICIOS', { m: 1, s: 12, c: C.cyan, w: 700, ls: 2 })}${T(958, 40, 'DATOS', { m: 1, s: 12, c: C.cyan, w: 700, ls: 2 })}${T(390, 40, 'GATEWAY', { m: 1, s: 12, c: C.cyan, w: 700, ls: 2 })}
      ${clients}${clientLinks}
      ${box('gw', 330, 175, 120, 74, { f: 'url(#gcl)', s: C.cyan, inner: T(390, 208, 'API', { w: 700, s: 15 }) + T(390, 227, 'Gateway', { w: 700, s: 15 }) })}
      ${gw}${links}${svc}${data}
      <rect x="20" y="330" width="1060" height="205" rx="18" fill="#0a1424" stroke="${C.violet}" stroke-width="1.4" stroke-dasharray="7 6"/>
      ${T(40, 354, 'CONTROL DE VERSIONES + CI/CD  ·  un repositorio Git por microservicio', { a: 'start', m: 1, s: 12, c: C.violet, w: 700, ls: 1 })}
      ${repos}
      ${box('gh', 722, 366, 150, 58, { f: 'url(#gcl)', s: C.violet, inner: T(797, 391, 'GitHub', { w: 700, s: 15 }) + T(797, 410, 'PR · Branch Protection', { m: 1, s: 10, c: C.violet }) })}
      ${box('ci', 902, 366, 160, 58, { inner: T(982, 391, 'GitHub Actions', { w: 700, s: 14 }) + T(982, 410, 'build · test · scan', { m: 1, s: 10, c: C.green }) })}
      <line x1="672" y1="394" x2="722" y2="394" stroke="${C.amber}" stroke-width="2" marker-end="url(#aro)"/><line x1="872" y1="395" x2="902" y2="395" stroke="${C.green}" stroke-width="2" marker-end="url(#arg)"/>
      ${T(550, 462, 'feature/*  →  Pull Request  →  revisión  →  main protegida  →  despliegue (Docker / Cloud)', { m: 1, s: 12.5, c: C.text })}
      ${T(550, 490, 'git add → commit → push  ·  Conventional Commits  ·  Semantic Versioning', { m: 1, s: 11.5, c: C.muted })}
      ${T(550, 516, 'Haz clic en un servicio o repositorio', { s: 12, c: C.muted })}
    </svg>`;
  }
  const archInfo = { gw: ['API Gateway', 'Punto único de entrada: autenticación, rate limiting y enrutamiento hacia los microservicios.'], gh: ['GitHub', 'Aloja los repos, aplica <b>Branch Protection</b> (revisión obligatoria + checks verdes) y gestiona Pull Requests.'], ci: ['GitHub Actions', 'Cada push/PR ejecuta compilación, pruebas y análisis; si todo pasa se construye la imagen Docker y se despliega.'] };
  SERVICES.forEach(s => { archInfo[s[0]] = [s[1], `<b>Repositorio:</b> <code>${s[2]}</code> · <b>Stack:</b> ${s[3]}<br>${s[4]} Flujo: rama <code>feature/*</code> → PR → <code>main</code>. Commits en formato <code>feat(${s[0]}): ...</code>`]; archInfo['r_' + s[0]] = archInfo[s[0]]; });

  /* ---------- Interactividad ---------- */
  function mountFlow(host, info) {
    host.innerHTML = flowSVG();
    const set = k => { const d = flowInfo[k]; if (!d) return; info.innerHTML = `<b>${d[0]}</b><br>${d[1]}`; host.querySelectorAll('.node').forEach(n => n.classList.toggle('sel', n.dataset.k === k)); };
    host.querySelectorAll('.node').forEach(n => n.addEventListener('click', () => set(n.dataset.k)));
    set('wd');
    let running = false;
    return function play() {
      if (running) return; running = true; const p = host.querySelector('#packet');
      const xs = [[130, 'wd'], [390, 'stage'], [650, 'repo'], [957, 'remote']]; let i = 0, x = 130;
      set('wd'); p.setAttribute('cx', 130);
      (function seg() {
        if (i >= xs.length - 1) { running = false; setTimeout(() => p.setAttribute('cx', -30), 900); return; }
        const from = xs[i][0], to = xs[i + 1][0], t0 = performance.now(), dur = 1100;
        (function tick(t) { const k = Math.min(1, (t - t0) / dur); p.setAttribute('cx', from + (to - from) * k);
          if (k < 1) requestAnimationFrame(tick); else { i++; set(['wd', 'stage', 'repo', 'remote'][i]); setTimeout(seg, 500); } })(t0);
      })();
    };
  }
  function mountArch(host, info) {
    host.innerHTML = archSVG();
    const set = k => { const d = archInfo[k]; if (!d) return; info.innerHTML = `<b>${d[0]}</b><br>${d[1]}`; host.querySelectorAll('.node').forEach(n => n.classList.toggle('sel', n.dataset.k === k)); };
    host.querySelectorAll('.node').forEach(n => n.addEventListener('click', () => set(n.dataset.k)));
    set('orders');
  }
  EB.Diagrams = { flowSVG, archSVG, mountFlow, mountArch };
})();
