# Guion del video — GA7-220501096-AA1-EV05

**Aprendiz:** Jaime Andrés Bejarano Pautt  
**Ficha:** 3336142  
**Programa:** Análisis y Desarrollo de Software (ADSO) - SENA  
**Proyecto:** Eagle Box — Plataforma de Logística de Última Milla

> Duración estimada: 7 min 20 s. Lectura pausada, ~130 palabras por minuto.

## 1. Saludo y presentación  _(0:00 – 0:35)_

🖥️ **En pantalla:** Portada del dashboard (Sección 1) con la tarjeta del aprendiz.

🎙️ Buen día. Mi nombre es Jaime Andrés Bejarano Pautt, aprendiz del programa Análisis y Desarrollo de Software (ADSO) - SENA, ficha 3336142.

🎙️ En este video presento la evidencia GA7-220501096-AA1-EV05: «Herramientas de versionamiento (GIT) instalada y configurada», aplicada a nuestro proyecto integrador Eagle Box, una plataforma de logística de última milla.

## 2. Contexto: ¿por qué versionar Eagle Box?  _(0:35 – 1:20)_

🖥️ **En pantalla:** Diagrama de arquitectura de Eagle Box (Sección 2).

🎙️ Eagle Box coordina pedidos, rutas, rastreo GPS y notificaciones entre clientes, repartidores y operadores. Es un sistema con varios módulos y varias personas programando al tiempo.

🎙️ Sin control de versiones, un cambio de un compañero puede pisar el mío, y no habría forma de volver atrás si algo falla en producción. Git resuelve esto: guarda cada cambio como una instantánea con autor, fecha y mensaje, y GitHub permite compartirlo en la nube.

## 3. El flujo de trabajo de Git  _(1:20 – 2:10)_

🖥️ **En pantalla:** Diagrama interactivo «Local vs Remoto». Pulsar «Reproducir flujo».

🎙️ Git trabaja en tres zonas locales y una remota. Primero está el Working Directory: la carpeta donde edito mis archivos. Con git add paso los cambios al Staging Area, donde los preparo. Con git commit los guardo de forma permanente en el repositorio local.

🎙️ Hasta ahí todo ocurre en mi computador. Con git push envío esos commits al repositorio remoto en GitHub, y con git pull o git fetch traigo lo que hicieron los demás.

## 4. Verificación de la instalación y configuración  _(2:10 – 2:50)_

🖥️ **En pantalla:** Terminal, Paso 0.

🎙️ Abro Git Bash y compruebo la instalación con git --version: tengo la versión 2.51 para Windows.

🎙️ Luego verifico mi identidad con git config --global user.name y user.email. Estos datos firman cada commit que hago, por eso es importante que estén bien configurados desde el comienzo.

## 5. Paso 1: inicialización y conexión remota  _(2:50 – 3:40)_

🖥️ **En pantalla:** Terminal, Paso 1.

🎙️ Creo la carpeta Programa-Git y ejecuto git init, que crea el repositorio local en la carpeta oculta .git. Git me avisa que usa «master» como rama inicial.

🎙️ Después conecto el repositorio con GitHub usando git remote add github y la URL https://github.com/jaime-bejarano/Programa-Git.git. Con git remote -v confirmo que quedaron registradas las direcciones de fetch y de push.

## 6. Paso 2: sincronización inicial y la rama main  _(3:40 – 4:30)_

🖥️ **En pantalla:** Terminal, Paso 2 y nota interactiva.

🎙️ Para poder subir algo necesito al menos un commit, así que creo un README y hago el «Commit inicial». Luego ejecuto git push github master, y Git muestra que se creó una nueva rama en el remoto.

🎙️ Una observación técnica: master es el nombre histórico, pero hoy la industria usa main. En un proyecto real configuraría git config --global init.defaultBranch main, o renombraría con git branch -M main y haría push con la opción -u.

## 7. Paso 3: archivo, commit y push final  _(4:30 – 5:30)_

🖥️ **En pantalla:** Terminal, Paso 3.

🎙️ Ahora creo el archivo kotlin.txt con mis datos: con echo y el signo mayor escribo «Nombre: Jaime Andrés Bejarano Pautt», y con doble mayor agrego el correo en la segunda línea.

🎙️ Preparo todo con git add punto, guardo con git commit -m «Añadido datos.», y subo con git push origin master. Como en el paso uno nombré el remoto «github», registro también el alias origin, que es la convención estándar.

🎙️ Con git log --oneline compruebo que mis dos commits existen y que origin/master apunta al último.

## 8. Verificación en GitHub  _(5:30 – 6:10)_

🖥️ **En pantalla:** Maqueta de GitHub: raíz del repositorio, archivo kotlin.txt e historial de commits.

🎙️ Entro a GitHub y abro el repositorio Programa-Git. En la raíz aparece kotlin.txt con el mensaje «Añadido datos.». Al abrirlo veo mis dos líneas, y en el historial de commits aparecen «Añadido datos.» y «Commit inicial». Esto confirma que la sincronización entre mi repositorio local y el remoto funciona.

## 9. De lo académico a lo profesional  _(6:10 – 6:50)_

🖥️ **En pantalla:** Cuadro comparativo (Sección 4).

🎙️ En esta práctica trabajé directamente sobre master y con mensajes libres. En un equipo profesional se usan Conventional Commits, por ejemplo «docs(config): add author data»; ramas feature que se integran por Pull Request con revisión; y Branch Protection en main para exigir revisiones y pruebas automáticas antes de fusionar.

## 10. Conclusión y cierre  _(6:50 – 7:20)_

🖥️ **En pantalla:** Diapositiva de conclusiones.

🎙️ Con esta evidencia demuestro que Git está instalado y configurado, que sé inicializar un repositorio, conectarlo a GitHub y sincronizar cambios, y que entiendo cómo estas prácticas protegen el desarrollo de Eagle Box.

🎙️ Gracias por su atención. Quedo atento a sus observaciones.

