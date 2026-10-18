/* ============================================================
   script.js — Guion del video, cuadro comparativo, conclusión y bibliografía
   (datos puros: los usa el dashboard, el .md del ZIP y el PowerPoint)
   ============================================================ */
window.EB = window.EB || {};

EB.guion = function () {
  const u = EB.user;
  return [
    { time: '0:00 – 0:35', title: 'Saludo y presentación', screen: 'Portada del dashboard (Sección 1) con la tarjeta del aprendiz.',
      say: [`Buen día. Mi nombre es ${u.name}, aprendiz del programa ${u.programa}, ficha ${u.ficha}.`,
        'En este video presento la evidencia GA7-220501096-AA1-EV05: «Herramientas de versionamiento (GIT) instalada y configurada», aplicada a nuestro proyecto integrador Eagle Box, una plataforma de logística de última milla.'] },
    { time: '0:35 – 1:20', title: 'Contexto: ¿por qué versionar Eagle Box?', screen: 'Diagrama de arquitectura de Eagle Box (Sección 2).',
      say: ['Eagle Box coordina pedidos, rutas, rastreo GPS y notificaciones entre clientes, repartidores y operadores. Es un sistema con varios módulos y varias personas programando al tiempo.',
        'Sin control de versiones, un cambio de un compañero puede pisar el mío, y no habría forma de volver atrás si algo falla en producción. Git resuelve esto: guarda cada cambio como una instantánea con autor, fecha y mensaje, y GitHub permite compartirlo en la nube.'] },
    { time: '1:20 – 2:10', title: 'El flujo de trabajo de Git', screen: 'Diagrama interactivo «Local vs Remoto». Pulsar «Reproducir flujo».',
      say: ['Git trabaja en tres zonas locales y una remota. Primero está el Working Directory: la carpeta donde edito mis archivos. Con git add paso los cambios al Staging Area, donde los preparo. Con git commit los guardo de forma permanente en el repositorio local.',
        'Hasta ahí todo ocurre en mi computador. Con git push envío esos commits al repositorio remoto en GitHub, y con git pull o git fetch traigo lo que hicieron los demás.'] },
    { time: '2:10 – 2:50', title: 'Verificación de la instalación y configuración', screen: 'Terminal, Paso 0.',
      say: ['Abro Git Bash y compruebo la instalación con git --version: tengo la versión 2.51 para Windows.',
        'Luego verifico mi identidad con git config --global user.name y user.email. Estos datos firman cada commit que hago, por eso es importante que estén bien configurados desde el comienzo.'] },
    { time: '2:50 – 3:40', title: 'Paso 1: inicialización y conexión remota', screen: 'Terminal, Paso 1.',
      say: ['Creo la carpeta Programa-Git y ejecuto git init, que crea el repositorio local en la carpeta oculta .git. Git me avisa que usa «master» como rama inicial.',
        `Después conecto el repositorio con GitHub usando git remote add github y la URL https://github.com/${u.ghUser}/${u.repo}.git. Con git remote -v confirmo que quedaron registradas las direcciones de fetch y de push.`] },
    { time: '3:40 – 4:30', title: 'Paso 2: sincronización inicial y la rama main', screen: 'Terminal, Paso 2 y nota interactiva.',
      say: ['Para poder subir algo necesito al menos un commit, así que creo un README y hago el «Commit inicial». Luego ejecuto git push github master, y Git muestra que se creó una nueva rama en el remoto.',
        'Una observación técnica: master es el nombre histórico, pero hoy la industria usa main. En un proyecto real configuraría git config --global init.defaultBranch main, o renombraría con git branch -M main y haría push con la opción -u.'] },
    { time: '4:30 – 5:30', title: 'Paso 3: archivo, commit y push final', screen: 'Terminal, Paso 3.',
      say: [`Ahora creo el archivo kotlin.txt con mis datos: con echo y el signo mayor escribo «Nombre: ${u.name}», y con doble mayor agrego el correo en la segunda línea.`,
        'Preparo todo con git add punto, guardo con git commit -m «Añadido datos.», y subo con git push origin master. Como en el paso uno nombré el remoto «github», registro también el alias origin, que es la convención estándar.',
        'Con git log --oneline compruebo que mis dos commits existen y que origin/master apunta al último.'] },
    { time: '5:30 – 6:10', title: 'Verificación en GitHub', screen: 'Maqueta de GitHub: raíz del repositorio, archivo kotlin.txt e historial de commits.',
      say: ['Entro a GitHub y abro el repositorio Programa-Git. En la raíz aparece kotlin.txt con el mensaje «Añadido datos.». Al abrirlo veo mis dos líneas, y en el historial de commits aparecen «Añadido datos.» y «Commit inicial». Esto confirma que la sincronización entre mi repositorio local y el remoto funciona.'] },
    { time: '6:10 – 6:50', title: 'De lo académico a lo profesional', screen: 'Cuadro comparativo (Sección 4).',
      say: ['En esta práctica trabajé directamente sobre master y con mensajes libres. En un equipo profesional se usan Conventional Commits, por ejemplo «docs(config): add author data»; ramas feature que se integran por Pull Request con revisión; y Branch Protection en main para exigir revisiones y pruebas automáticas antes de fusionar.'] },
    { time: '6:50 – 7:20', title: 'Conclusión y cierre', screen: 'Diapositiva de conclusiones.',
      say: ['Con esta evidencia demuestro que Git está instalado y configurado, que sé inicializar un repositorio, conectarlo a GitHub y sincronizar cambios, y que entiendo cómo estas prácticas protegen el desarrollo de Eagle Box.',
        'Gracias por su atención. Quedo atento a sus observaciones.'] }
  ];
};

EB.compare = [
  ['Mensajes de commit', 'Texto libre: «Añadido datos.»', 'Conventional Commits: <code>docs(config): add author data</code>'],
  ['Ramas', 'Trabajo directo sobre <code>master</code>', 'Ramas cortas <code>feature/*</code>, <code>fix/*</code> y rama <code>main</code>'],
  ['Integración', '<code>git push</code> directo al remoto', 'Pull Request con revisión de código (code review)'],
  ['Protección', 'Ninguna', 'Branch Protection: revisión obligatoria, checks en verde, sin <i>force-push</i>'],
  ['Autenticación', 'Usuario / token manual', 'Llaves SSH o Git Credential Manager, 2FA, commits firmados'],
  ['Automatización', 'Todo manual', 'CI con GitHub Actions + hooks (commitlint, linters, pruebas)'],
  ['Versionado', 'Sin versiones', 'Semantic Versioning + tags y Releases']
];

EB.conclusion = [
  'Git quedó instalado y configurado (versión, <code>user.name</code> y <code>user.email</code>) y se verificó desde Git Bash.',
  'Se inicializó un repositorio local, se vinculó con GitHub y se sincronizó el trabajo con <code>git push</code>, evidenciado en el historial de commits.',
  'Se comprendió el flujo Working Directory → Staging → Repositorio local → Remoto y su papel en el trabajo colaborativo de Eagle Box.',
  'Las prácticas profesionales (Conventional Commits, Pull Requests, Branch Protection y rama <code>main</code>) son el siguiente paso natural del proyecto.'
];

EB.bib = [
  ['Chacon, S. y Straub, B. (2014). <i>Pro Git</i> (2.ª ed.). Apress. Edición en español.', 'https://git-scm.com/book/es/v2'],
  ['Git SCM. (s. f.). <i>Git Reference Manual</i>.', 'https://git-scm.com/docs'],
  ['GitHub Docs. (s. f.). <i>About protected branches</i> y <i>About pull requests</i>.', 'https://docs.github.com/'],
  ['Conventional Commits. (2023). <i>Conventional Commits 1.0.0</i> (es).', 'https://www.conventionalcommits.org/es/v1.0.0/'],
  ['Atlassian. (s. f.). <i>Git tutorials</i>.', 'https://www.atlassian.com/git/tutorials'],
  ['Preston-Werner, T. (s. f.). <i>Semantic Versioning 2.0.0</i>.', 'https://semver.org/lang/es/'],
  ['SENA. (2022). <i>GA7-220501096-AA1-EV05: Herramientas de versionamiento (GIT) instalada y configurada</i>. Programa ADSO.', '']
];

/* Markdown del guion (se incluye en el ZIP) */
EB.guionMarkdown = function () {
  const u = EB.user;
  let md = `# Guion del video — GA7-220501096-AA1-EV05\n\n**Aprendiz:** ${u.name}  \n**Ficha:** ${u.ficha}  \n**Programa:** ${u.programa}  \n**Proyecto:** Eagle Box — Plataforma de Logística de Última Milla\n\n> Duración estimada: 7 min 20 s. Lectura pausada, ~130 palabras por minuto.\n\n`;
  EB.guion().forEach((b, i) => { md += `## ${i + 1}. ${b.title}  _(${b.time})_\n\n🖥️ **En pantalla:** ${b.screen}\n\n${b.say.map(p => '🎙️ ' + p).join('\n\n')}\n\n`; });
  return md;
};
