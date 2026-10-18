#!/usr/bin/env bash
# Verifica que Git esté instalado y configurado (insumo para la captura del Paso 0)
git --version || { echo "Git no está instalado: https://git-scm.com/downloads"; exit 1; }
echo "user.name  = $(git config --global user.name)"
echo "user.email = $(git config --global user.email)"
echo "defaultBranch = $(git config --global init.defaultBranch || echo '(sin definir → master)')"
