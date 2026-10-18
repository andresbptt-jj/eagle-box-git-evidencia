/* ============================================================
   terminal.js — Componente de terminal estilo Git Bash (MINGW64)
   ============================================================ */
(function () {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function promptHTML(l) {
    const u = EB.user;
    return `<span class="prompt"><span class="t-user">${u.shortUser}@${u.host}</span> <span class="t-mingw">MINGW64</span> <span class="t-path">${esc(l.cwd || '~')}</span>${l.br ? ` <span class="t-branch">(${l.br})</span>` : ''}\n<span class="t-cmd">$ </span>`;
  }
  const outHTML = l => `<div class="${l.cls || ''}">${l.html || esc(l.text)}</div>`;

  function windowHTML(step) {
    return `<div class="win" role="img" aria-label="Captura de Git Bash: ${esc(step.sub)}">
      <div class="win-title"><span class="ico">&gt;_</span><span class="title">${esc(step.title)}</span>
        <div class="win-ctrl"><span>&#8211;</span><span>&#9633;</span><span>&#10005;</span></div></div>
      <div class="term-body" data-body></div></div>`;
  }

  /** Render estático (todas las líneas) — usado en capturas y modo "instantáneo". */
  function renderStatic(body, step) {
    body.innerHTML = step.lines.map(l => l.k === 'cmd' ? `${promptHTML(l)}<span class="t-cmd">${esc(l.text)}</span></span>` : outHTML(l)).join('') +
      promptHTML({ cwd: lastCwd(step), br: lastBr(step) }) + '<span class="cursor"></span></span>';
  }
  const lastCwd = s => [...s.lines].reverse().find(l => l.k === 'cmd').cwd;
  const lastBr = s => {
    const c = s.lines.filter(l => l.k === 'cmd'); const last = c[c.length - 1];
    return s.id === 1 ? 'master' : last.br;
  };

  /** Controlador con animación de tecleo. */
  function mount(host, idx) {
    const steps = EB.steps();
    let token = 0, cur = idx || 0;
    host.innerHTML = windowHTML(steps[cur]);
    const body = () => host.querySelector('[data-body]');
    const setTitle = () => host.querySelector('.title').textContent = steps[cur].title;

    async function play(fast) {
      const my = ++token; const step = steps[cur]; const b = body(); b.innerHTML = '';
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      for (const l of step.lines) {
        if (my !== token) return;
        if (l.k === 'cmd') {
          const wrap = document.createElement('span'); wrap.innerHTML = promptHTML(l); b.appendChild(wrap.firstChild);
          const p = b.lastChild; const t = document.createElement('span'); t.className = 't-cmd'; p.appendChild(t);
          const cu = document.createElement('span'); cu.className = 'cursor'; p.appendChild(cu);
          for (const ch of l.text) { if (my !== token) return; t.textContent += ch; if (!fast) await sleep(18 + Math.random() * 28); }
          if (!fast) await sleep(320); cu.remove();
        } else {
          b.insertAdjacentHTML('beforeend', outHTML(l)); if (!fast) await sleep(l.text && l.text.length > 120 ? 520 : 240);
        }
        b.scrollTop = b.scrollHeight;
      }
      if (my !== token) return;
      b.insertAdjacentHTML('beforeend', promptHTML({ cwd: lastCwd(step), br: lastBr(step) }) + '<span class="cursor"></span></span>');
      b.scrollTop = b.scrollHeight;
    }
    function show(i, auto) { cur = i; token++; host.querySelector('.win').outerHTML = windowHTML(steps[cur]); renderStatic(body(), steps[cur]); if (auto) play(false); }
    return {
      show, play: () => play(false), instant: () => { token++; renderStatic(body(), steps[cur]); },
      reset: () => { token++; body().innerHTML = ''; }, get index() { return cur; },
      commands: () => steps[cur].lines.filter(l => l.k === 'cmd').map(l => l.text).join('\n'),
      step: () => steps[cur]
    };
  }

  EB.Terminal = { mount, windowHTML, renderStatic, promptHTML };
})();
