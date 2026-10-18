/* ============================================================
   export.js — Exportación: ZIP (JSZip), PowerPoint, impresión y modo diapositivas
   Los archivos fuente llegan en window.EB_FILES (inyectado por build.mjs).
   ============================================================ */
(function () {
  const toast = (m) => { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 3200); };
  EB.toast = toast;

  async function save(blob, name) {
    try { // Artifact de claude.ai: capacidad "downloads" (pide confirmación al usuario)
      const d = window.claude && await window.claude.use('downloads');
      if (d) { await d.save({ filename: name, data: blob }); return; }
    } catch (e) { if (e && e.code === 'declined') return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  const b64ToU8 = b => Uint8Array.from(atob(b), c => c.charCodeAt(0));

  /** Aplica el correo editado por el usuario a los archivos de texto del paquete. */
  const personalize = s => s.split('tu_correo@dominio.com').join(EB.user.email);

  async function downloadZip() {
    if (!window.JSZip) { toast('JSZip no cargó (¿sin conexión?). Reintenta con internet.'); return; }
    const files = window.EB_FILES; if (!files) { toast('Ejecuta build.mjs para incrustar los archivos.'); return; }
    const zip = new JSZip(), root = 'eagle-box-git-evidencia/';
    Object.entries(files).forEach(([p, f]) => {
      if (f.t === 'b64') zip.file(root + p, b64ToU8(f.c)); else zip.file(root + p, personalize(f.c));
    });
    zip.file(root + 'docs/guion-video.md', EB.guionMarkdown());
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
    await save(blob, 'eagle-box-git-evidencia.zip'); toast(`✔ ZIP generado · ${Object.keys(files).length + 1} archivos`);
  }

  async function downloadPptx() {
    const f = window.EB_FILES && window.EB_FILES['presentacion/EagleBox_Git_Evidencia.pptx'];
    if (!f) { toast('El PowerPoint no está incrustado en esta versión.'); return; }
    await save(new Blob([b64ToU8(f.c)], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }), 'EagleBox_Git_Evidencia.pptx');
    toast('✔ PowerPoint descargado');
  }

  function printDoc() {
    document.querySelectorAll('details').forEach(d => d.setAttribute('open', ''));
    toast('En el diálogo elige «Guardar como PDF» · orientación horizontal'); setTimeout(() => window.print(), 500);
  }

  /* ---- Modo diapositivas ---- */
  let idx = 0; const secs = () => [...document.querySelectorAll('.section')];
  function go(i) {
    const s = secs(); idx = (i + s.length) % s.length; s.forEach((e, k) => e.classList.toggle('active', k === idx));
    document.getElementById('hudPos').textContent = `${idx + 1} / ${s.length}`; window.scrollTo({ top: 0 });
    document.querySelectorAll('canvas').forEach(c => c.dispatchEvent(new Event('resize')));
  }
  function present(on) {
    document.body.classList.toggle('present', on);
    if (on) { document.querySelectorAll('details').forEach(d => d.setAttribute('open', '')); go(0); document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => { }); }
    else { secs().forEach(e => e.classList.remove('active')); if (document.fullscreenElement) document.exitFullscreen().catch(() => { }); }
  }
  document.addEventListener('keydown', e => {
    if (!document.body.classList.contains('present')) return;
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(idx + 1); }
    if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(idx - 1); }
    if (e.key === 'Escape') present(false);
  });
  window.addEventListener('beforeprint', () => document.querySelectorAll('details').forEach(d => d.setAttribute('open', '')));

  EB.Export = { downloadZip, downloadPptx, printDoc, present, go: d => go(idx + d) };
})();
