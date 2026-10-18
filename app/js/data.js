/* ============================================================
   data.js — Datos del aprendiz y guiones de terminal (fuente única)
   ============================================================ */
window.EB = window.EB || {};

EB.user = {
  name: 'Jaime Andrés Bejarano Pautt',
  ficha: '3336142',
  instructor: 'Juan Antonio Hernández Estrada',
  fecha: 'Octubre 2026',
  programa: 'Análisis y Desarrollo de Software (ADSO) - SENA',
  email: 'tu_correo@dominio.com',      // ← editable desde la portada
  ghUser: 'jaime-bejarano',
  repo: 'Programa-Git',
  host: 'EAGLE-BOX',
  shortUser: 'jaime'
};
EB.url = () => `https://github.com/${EB.user.ghUser}/${EB.user.repo}.git`;
EB.COMMITS = [
  { sha: 'a3f9c21', full: 'a3f9c21d7e4b58f0c19a6b2d3e8f7a4c5b1d9e60', msg: 'Añadido datos.', ago: 'now', date: 'Oct 17, 2026' },
  { sha: '7c1e4b0', full: '7c1e4b09a2d6f3185e7c4a0b9d1f2e3a6c8b5d47', msg: 'Commit inicial', ago: '3 minutes ago', date: 'Oct 17, 2026' }
];

/* Cada línea: {k:'cmd'|'out'|'blank', text, cls, cwd, br}.
   cmd → se escribe con prompt estilo Git Bash (MINGW64). */
EB.steps = function () {
  const u = EB.user, URL = EB.url();
  const P = (cwd, br) => ({ cwd, br });
  const home = '~', repo = '~/Programa-Git';
  const crlf = f => ({ k: 'out', cls: 't-warn', text: `warning: in the working copy of '${f}', LF will be replaced by CRLF the next time Git touches it` });
  return [
    {
      id: 0, tab: 'Paso 0', sub: 'Verificar instalación', title: `MINGW64:/c/Users/${u.shortUser}`,
      lines: [
        { k: 'cmd', text: 'git --version', ...P(home) },
        { k: 'out', text: 'git version 2.51.0.windows.1' },
        { k: 'cmd', text: 'git config --global user.name', ...P(home) },
        { k: 'out', text: u.name },
        { k: 'cmd', text: 'git config --global user.email', ...P(home) },
        { k: 'out', text: u.email },
        { k: 'cmd', text: 'mkdir Programa-Git && cd Programa-Git', ...P(home) },
      ],
      note: {
        t: 'Instalación y configuración de Git',
        html: `<p>Antes de versionar se verifica que <code>git</code> esté instalado y que la identidad global del autor esté configurada. Si faltara, se configura así:</p>
<pre>git config --global user.name "${u.name}"
git config --global user.email "${u.email}"
git config --global init.defaultBranch main   # buena práctica</pre>
<p>Cada commit queda firmado con ese nombre y correo; es la base de la trazabilidad en un equipo.</p>`
      }
    },
    {
      id: 1, tab: 'Paso 1', sub: 'Inicialización y remoto', title: `MINGW64:/c/Users/${u.shortUser}/Programa-Git`,
      lines: [
        { k: 'cmd', text: 'git init', ...P(repo) },
        { k: 'out', cls: 't-hint', text: `hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint: \tgit config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint: \tgit branch -m <name>` },
        { k: 'out', text: `Initialized empty Git repository in C:/Users/${u.shortUser}/Programa-Git/.git/` },
        { k: 'cmd', text: `git remote add github ${URL}`, ...P(repo, 'master') },
        { k: 'cmd', text: 'git remote -v', ...P(repo, 'master') },
        { k: 'out', text: `github\t${URL} (fetch)\ngithub\t${URL} (push)` },
      ],
      note: {
        t: '¿Qué hace cada comando?',
        html: `<ul><li><code>git init</code> crea la carpeta oculta <code>.git</code> (el repositorio local).</li>
<li><code>git remote add github &lt;url&gt;</code> registra un alias llamado <b>github</b> que apunta al servidor en la nube.</li>
<li><code>git remote -v</code> lista los remotos con sus URLs de <b>fetch</b> (descargar) y <b>push</b> (subir).</li></ul>`
      }
    },
    {
      id: 2, tab: 'Paso 2', sub: 'Sincronización inicial', title: `MINGW64:/c/Users/${u.shortUser}/Programa-Git`,
      lines: [
        { k: 'cmd', text: 'echo "# Programa-Git" > README.md', ...P(repo, 'master') },
        { k: 'cmd', text: 'git add README.md', ...P(repo, 'master') },
        crlf('README.md'),
        { k: 'cmd', text: 'git commit -m "Commit inicial"', ...P(repo, 'master') },
        { k: 'out', text: '[master (root-commit) 7c1e4b0] Commit inicial\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md' },
        { k: 'cmd', text: 'git push github master', ...P(repo, 'master') },
        { k: 'out', text: `Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 232 bytes | 232.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To ${URL}
 * [new branch]      master -> master` },
      ],
      note: {
        t: 'Nota técnica: de la rama «master» a «main» (buena práctica industrial)',
        open: true,
        html: `<p>Git, por defecto, crea la rama <code>master</code>. Desde 2020 GitHub, GitLab y la comunidad adoptaron <code>main</code> como nombre estándar (lenguaje más neutral y consistente entre plataformas). En esta evidencia se empuja <code>master</code> para respetar la guía del ejercicio; en un entorno profesional se migraría así:</p>
<pre>git branch -M main
git push -u github main
git push github --delete master      # opcional, tras cambiar la rama por defecto
git config --global init.defaultBranch main</pre>
<ul><li>El <code>-u</code> fija la rama remota de seguimiento (<i>upstream</i>), así luego basta con <code>git push</code>.</li>
<li>El primer <i>push</i> necesita al menos un commit: por eso se creó antes un <code>README.md</code> con «Commit inicial».</li></ul>`
      }
    },
    {
      id: 3, tab: 'Paso 3', sub: 'Archivo, commit y push', title: `MINGW64:/c/Users/${u.shortUser}/Programa-Git`,
      lines: [
        { k: 'cmd', text: `echo "Nombre: ${u.name}" > kotlin.txt`, ...P(repo, 'master') },
        { k: 'cmd', text: `echo "Correo: ${u.email}" >> kotlin.txt`, ...P(repo, 'master') },
        { k: 'cmd', text: 'git add .', ...P(repo, 'master') },
        crlf('kotlin.txt'),
        { k: 'cmd', text: 'git commit -m "Añadido datos."', ...P(repo, 'master') },
        { k: 'out', text: '[master a3f9c21] Añadido datos.\n 1 file changed, 2 insertions(+)\n create mode 100644 kotlin.txt' },
        { k: 'cmd', text: `git remote add origin ${URL}`, ...P(repo, 'master') },
        { k: 'cmd', text: 'git push origin master', ...P(repo, 'master') },
        { k: 'out', text: `Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 352 bytes | 352.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To ${URL}
   7c1e4b0..a3f9c21  master -> master` },
        { k: 'cmd', text: 'git log --oneline', ...P(repo, 'master') },
        { k: 'out', html: `<span class="t-hash">a3f9c21</span> <span class="t-ref">(<span class="t-head">HEAD -&gt; </span><span class="t-ok">master</span>, <span style="color:#ff6b6b">origin/master</span>)</span> Añadido datos.\n<span class="t-hash">7c1e4b0</span> <span class="t-ref">(<span style="color:#ff6b6b">github/master</span>)</span> Commit inicial` },
      ],
      note: {
        t: 'Sobre el remoto «origin»',
        html: `<p>En el Paso 1 el remoto se llamó <code>github</code>. Como el ejercicio pide finalizar con <code>git push origin master</code>, se registra además el alias <code>origin</code> (la convención universal) apuntando a la misma URL. Alternativa limpia: <code>git remote rename github origin</code>.</p>
<ul><li><code>&gt;</code> sobrescribe el archivo y <code>&gt;&gt;</code> añade al final.</li><li><code>git add .</code> mueve los cambios del <b>Working Directory</b> al <b>Staging Area</b>.</li><li>El mensaje con punto final y en español sigue el enunciado; en equipo se usaría <i>Conventional Commits</i> (ver sección 4).</li></ul>`
      }
    }
  ];
};

/* Contenido del repositorio remoto (para el mock de GitHub) */
EB.files = function () {
  const u = EB.user;
  const kt = `Nombre: ${u.name}\nCorreo: ${u.email}\n`;
  return {
    'kotlin.txt': { content: kt, bytes: new TextEncoder().encode(kt).length, msg: 'Añadido datos.', ago: 'now' },
    'README.md': { content: '# Programa-Git\n', bytes: 15, msg: 'Commit inicial', ago: '3 minutes ago' }
  };
};
