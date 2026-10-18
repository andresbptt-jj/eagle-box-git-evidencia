#!/usr/bin/env bash
# =====================================================================
# GA7-220501096-AA1-EV05 · Versionamiento con GIT · Proyecto Eagle Box
# Aprendiz: Jaime Andrés Bejarano Pautt · Ficha 3336142 · ADSO - SENA
#
# Reproduce de verdad los 3 pasos de la evidencia en Git Bash / Linux / macOS.
# Uso:   bash setup-evidencia.sh "mi_correo@dominio.com"
# Requisito: haber creado en GitHub el repositorio VACÍO "Programa-Git"
#            (sin README, sin .gitignore, sin licencia).
# Tras ejecutarlo, toma tus capturas REALES (terminal y página de GitHub).
# =====================================================================
set -euo pipefail

EMAIL="${1:-tu_correo@dominio.com}"
NOMBRE="Jaime Andrés Bejarano Pautt"
GH_USER="jaime-bejarano"
REPO="Programa-Git"
URL="https://github.com/${GH_USER}/${REPO}.git"

echo "── PASO 0 · Verificación de instalación y configuración ──"
git --version
git config --global user.name  >/dev/null || git config --global user.name  "$NOMBRE"
git config --global user.email >/dev/null || git config --global user.email "$EMAIL"
git config --global user.name
git config --global user.email

mkdir -p "$REPO" && cd "$REPO"

echo; echo "── PASO 1 · Inicialización y conexión remota ──"
git init
git remote add github "$URL"
git remote -v

echo; echo "── PASO 2 · Sincronización inicial ──"
# El primer push requiere al menos un commit:
echo "# Programa-Git" > README.md
git add README.md
git commit -m "Commit inicial"
git push github master
# Buena práctica (opcional): migrar a 'main'
#   git branch -M main && git push -u github main

echo; echo "── PASO 3 · Archivo, commit y push final ──"
echo "Nombre: ${NOMBRE}" > kotlin.txt
echo "Correo: ${EMAIL}" >> kotlin.txt
git add .
git commit -m "Añadido datos."
git remote add origin "$URL" 2>/dev/null || true   # alias estándar 'origin'
git push origin master

echo; git log --oneline
echo "✔ Listo: abre ${URL%.git} y toma la captura del repositorio."
