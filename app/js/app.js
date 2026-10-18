/* ============================================================
   app.js — Orquestación: navegación, montaje de componentes y estado
   ============================================================ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const safe = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } } };

  /* ---- Estado: correo editable ---- */
  const saved = safe.get('eb-email'); if (saved) EB.user.email = saved;
  $('#emailInput').value = EB.user.email;

  /* ---- Hero ---- */
  EB.Hero($('#heroCanvas'));

  /* ---- Diagramas ---- */
  const playFlow = EB.Diagrams.mountFlow($('#flowHost'), $('#flowInfo'));
  $('#btnFlow').onclick = playFlow;
  EB.Diagrams.mountArch($('#archHost'), $('#archInfo'));

  /* ---- Terminal ---- */
  const tabs = $('#stepTabs'); const steps = EB.steps(); let term = EB.Terminal.mount($('#termHost'), 0); let cur = 0;
  function drawTabs() { tabs.innerHTML = steps.map((s, i) => `<button role="tab" class="${i === cur ? 'active' : ''}" data-i="${i}">${s.tab}<small>${s.sub}</small></button>`).join(''); }
  function note() {
    const n = EB.steps()[cur].note; $('#termNoteT').innerHTML = '💡 ' + n.t; $('#termNoteB').innerHTML = n.html; $('#termNote').open = !!n.open;
  }
  function select(i, auto) { cur = i; drawTabs(); term.show(i, auto); note(); }
  tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) select(+b.dataset.i, true); });
  $('#tPlay').onclick = () => term.play(); $('#tInstant').onclick = () => term.instant(); $('#tReset').onclick = () => term.reset();
  $('#tCopy').onclick = async () => { try { await navigator.clipboard.writeText(term.commands()); EB.toast('✔ Comandos copiados'); } catch (e) { EB.toast('No se pudo copiar'); } };
  select(0);

  /* ---- GitHub ---- */
  const gh = EB.GitHubMock.mount($('#ghHost'), 'repo');
  $('#ghTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#ghTabs button').forEach(x => x.classList.toggle('active', x === b)); gh.draw(b.dataset.v, 'kotlin.txt'); });

  /* ---- Correo editable → re-render ---- */
  $('#emailInput').addEventListener('input', e => {
    EB.user.email = e.target.value.trim() || 'tu_correo@dominio.com'; safe.set('eb-email', EB.user.email);
    select(cur); const v = $('#ghTabs .active').dataset.v; gh.draw(v, 'kotlin.txt');
  });

  /* ---- Guion ---- */
  $('#guionHost').innerHTML = EB.guion().map((b, i) => `<details class="script-block" ${i === 0 ? 'open' : ''}><summary><span class="time">${b.time}</span>${i + 1}. ${b.title}</summary>
    <div class="script-body"><div class="screen">🖥️ <b>En pantalla:</b> ${b.screen}</div>${b.say.map(p => `<p>🎙️ ${p}</p>`).join('')}</div></details>`).join('');
  $('#compareBody').innerHTML = EB.compare.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('');
  $('#conclusionList').innerHTML = EB.conclusion.map(c => `<li style="margin:6px 0">${c}</li>`).join('');
  $('#bibList').innerHTML = EB.bib.map(b => `<li>${b[0]} ${b[1] ? `<a href="${b[1]}" target="_blank" rel="noopener">${b[1]}</a>` : ''}</li>`).join('');

  /* ---- Árbol del paquete ---- */
  $('#treeBox').innerHTML = `<b>eagle-box-git-evidencia/</b>
├─ README.md
├─ kotlin.txt                    <i># archivo de la evidencia</i>
├─ <b>scripts/</b>
│  ├─ setup-evidencia.sh         <i># reproduce los 3 pasos en Git Bash</i>
│  ├─ setup-evidencia.ps1        <i># versión PowerShell</i>
│  └─ verificar-instalacion.sh
├─ <b>capturas/</b>               <i># PNG de terminales y GitHub</i>
├─ <b>docs/</b>
│  ├─ guion-video.md
│  └─ buenas-practicas.md
├─ <b>presentacion/</b>
│  └─ EagleBox_Git_Evidencia.pptx
└─ <b>app/</b>                    <i># fuente modular del dashboard</i>
   ├─ index.html
   ├─ css/ (theme · layout · components · print)
   └─ js/  (data · terminal · github-mock · diagrams · …)`;

  /* ---- Navegación ---- */
  const links = $$('#nav a');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const id = e.target.id; links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id)); $('#crumb').textContent = e.target.dataset.title; } }), { rootMargin: '-45% 0px -50% 0px' });
  $$('.section').forEach(s => io.observe(s));
  $('#menuBtn').onclick = () => document.body.classList.toggle('menu-open');
  $('#nav').addEventListener('click', e => { if (e.target.closest('a')) document.body.classList.remove('menu-open'); });
  document.addEventListener('click', e => { if (document.body.classList.contains('menu-open') && !e.target.closest('#sidebar') && !e.target.closest('#menuBtn')) document.body.classList.remove('menu-open'); });

  /* ---- Exportación ---- */
  const X = EB.Export;
  ['btnZip', 'btnZip2'].forEach(id => $('#' + id).onclick = X.downloadZip);
  ['btnPptx', 'btnPptx2'].forEach(id => $('#' + id).onclick = X.downloadPptx);
  ['btnPrint', 'btnPrint2'].forEach(id => $('#' + id).onclick = X.printDoc);
  ['btnPresent', 'btnPresent2'].forEach(id => $('#' + id).onclick = () => X.present(true));
  $('#hudPrev').onclick = () => X.go(-1); $('#hudNext').onclick = () => X.go(1); $('#hudExit').onclick = () => X.present(false);
})();
