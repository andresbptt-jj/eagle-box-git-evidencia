/* ============================================================
   github-mock.js — Maqueta fiel de la interfaz web del repositorio
   (vistas: repo · file · commits). Íconos propios, estilo "Primer" oscuro.
   ============================================================ */
(function () {
  const I = {
    file: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M2 1.75C2 .78 2.78 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>',
    branch: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"/></svg>',
    hist: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M1.643 3.143.427 1.927A.25.25 0 0 0 0 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.5 6.5 0 1 1-1.18 4.458.75.75 0 1 0-1.493.154 8.001 8.001 0 1 0 1.6-5.684ZM7.75 4a.75.75 0 0 1 .75.75v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5A.75.75 0 0 1 7.75 4Z"/></svg>',
    code: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>',
    book: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"/></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"/></svg>',
    fork: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>',
    copy: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>',
    dot: '<svg width="16" height="16" viewBox="0 0 16 16" fill="#8d96a0"><path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/></svg>',
    check: '<svg class="gh-ok" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>',
    caret: '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/></svg>'
  };
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const ini = () => EB.user.name.split(' ').filter((_, i, a) => i === 0 || i === a.length - 2).map(w => w[0]).join('').toUpperCase();

  function chrome(view, inner, path) {
    const u = EB.user, base = `github.com/${u.ghUser}/${u.repo}`;
    const tabs = [['Code', 1], ['Issues', 0], ['Pull requests', 0], ['Actions'], ['Projects'], ['Security'], ['Insights'], ['Settings']];
    return `<div class="gh">
      <div class="gh-browser"><div class="gh-dots"><i></i><i></i><i></i></div><div class="gh-url">🔒 <b>${base}</b>${path || ''}</div></div>
      <div class="gh-top"><div class="logo"><svg width="14" height="14" viewBox="0 0 16 16" fill="#e6edf3"><circle cx="8" cy="8" r="3"/></svg></div>
        <div class="search">Type <b>/</b> to search</div>
        <div class="right"><span>Pull requests</span><span>Issues</span><div class="gh-av">${ini()}</div></div></div>
      <div class="gh-repohead">
        <div class="gh-title">${I.book}<a>${u.ghUser}</a> / <b><a>${u.repo}</a></b> <span class="pill">Public</span>
          <div class="acts"><span class="gh-btn">${I.eye} Watch 1</span><span class="gh-btn">${I.fork} Fork 0</span><span class="gh-btn">${I.star} Star 0</span></div></div>
        <div class="gh-tabs">${tabs.map(([t, c], i) => `<span class="${i === 0 ? 'on' : ''}">${t}${c !== undefined && c !== 1 ? `<i class="cnt" style="font-style:normal">${c}</i>` : ''}</span>`).join('')}</div>
      </div>
      <div class="gh-body">${inner}</div></div>`;
  }

  function sidebar() {
    const u = EB.user;
    return `<aside class="gh-side"><h4>About</h4>
      <div class="about">Evidencia GA7-220501096-AA1-EV05 · Versionamiento con Git · Proyecto Eagle Box (logística de última milla).</div>
      <div class="gh-topics"><span>git</span><span>github</span><span>sena</span><span>eagle-box</span></div>
      <div class="li">${I.book} Readme</div><div class="li">${I.star} 0 stars</div><div class="li">${I.eye} 1 watching</div><div class="li">${I.fork} 0 forks</div><hr>
      <h4>Releases</h4><div class="li" style="margin:0">No releases published</div><hr>
      <h4>Languages</h4><div class="gh-lang li"><span><i></i>Text 100.0%</span></div></aside>`;
  }

  function repoView() {
    const u = EB.user, F = EB.files(), C = EB.COMMITS[0];
    const rows = ['kotlin.txt', 'README.md'].map(n => `<div class="gh-row" data-open="${n}">${I.file}<span class="nm">${n}</span><span class="c">${esc(F[n].msg)}</span><span class="t">${F[n].ago}</span></div>`).join('');
    const main = `<div><div class="gh-bar"><span class="gh-btn">${I.branch} master ${I.caret}</span><span class="meta"><b style="color:#e6edf3">1</b> Branch &nbsp; <b style="color:#e6edf3">0</b> Tags</span>
        <span class="r"><span class="gh-btn">Go to file</span><span class="gh-btn green">${I.code} Code ${I.caret}</span></span></div>
      <div class="gh-box"><div class="head"><div class="gh-av lg">${ini()}</div><b>${u.ghUser}</b><span class="msg">${esc(C.msg)}</span>
          <span class="hash">${C.sha} · ${C.ago} &nbsp;<a data-go="commits" style="color:#e6edf3;cursor:pointer">${I.hist} <b>2 Commits</b></a></span></div>${rows}</div>
      <div class="gh-box gh-readme"><div class="head">${I.book}<b>README</b></div><div class="md"><h1>Programa-Git</h1><p>Repositorio de la evidencia <b>GA7-220501096-AA1-EV05</b> — Herramientas de versionamiento (GIT) instalada y configurada.</p></div></div></div>`;
    return chrome('repo', main + sidebar());
  }

  function fileView(name) {
    const u = EB.user, F = EB.files()[name], C = EB.COMMITS[0];
    const lines = F.content.replace(/\n$/, '').split('\n');
    const code = lines.map((l, i) => `<div class="ln"><span>${i + 1}</span><span>${esc(l)}</span></div>`).join('');
    const main = `<div><div class="gh-bar"><span class="gh-btn">${I.branch} master ${I.caret}</span><span style="color:#8d96a0">${u.repo} / <b style="color:#e6edf3">${name}</b></span></div>
      <div class="gh-box"><div class="head"><div class="gh-av lg">${ini()}</div><b>${u.ghUser}</b><span class="msg">${esc(F.msg)}</span><span class="hash">${name === 'kotlin.txt' ? C.sha : '7c1e4b0'} · ${F.ago}</span></div>
      <div class="head" style="background:#0d1117;color:#8d96a0"><span>Code</span><span style="color:#e6edf3;font-weight:600">Blame</span><span style="margin-left:12px">${lines.length} lines (${lines.length} loc) · ${F.bytes} Bytes</span><span style="margin-left:auto" class="gh-btn">Raw</span><span class="gh-btn">${I.copy}</span></div>
      <div class="gh-code" style="padding:8px 0 10px">${code}</div></div></div>`;
    return chrome('file', main + sidebar(), `/blob/master/${name}`);
  }

  function commitsView() {
    const u = EB.user;
    const items = EB.COMMITS.map((c, i) => `<div class="gh-commit"><div class="gh-av">${ini()}</div><div><div class="m">${esc(c.msg)}</div><div class="by"><b style="color:#e6edf3">${u.ghUser}</b> committed ${c.ago}</div></div>
      <div class="r">${I.check}<span class="sha">${c.sha}</span>${I.copy}</div></div>`).join('');
    const main = `<div style="grid-column:1/-1"><div class="gh-bar"><span class="gh-btn">${I.branch} master ${I.caret}</span><span class="meta">All users · All time</span></div>
      <div class="gh-commit-group"><h5>${I.dot.replace('width="16" height="16"', 'width="12" height="12"')} Commits on ${EB.COMMITS[0].date}</h5><div class="gh-box">${items}</div></div></div>`;
    return chrome('commits', main, '/commits/master');
  }

  function mount(host, view) {
    const draw = (v, f) => { host.innerHTML = v === 'file' ? fileView(f) : v === 'commits' ? commitsView() : repoView();
      host.querySelectorAll('[data-open]').forEach(e => e.onclick = () => draw('file', e.dataset.open));
      host.querySelectorAll('[data-go]').forEach(e => e.onclick = () => draw('commits'));
      host.querySelector('.gh-title a').onclick = () => draw('repo'); host.querySelector('.gh-tabs .on').onclick = () => draw('repo'); };
    draw(view || 'repo', 'kotlin.txt'); return { draw };
  }
  EB.GitHubMock = { mount, repoView, fileView, commitsView };
})();
