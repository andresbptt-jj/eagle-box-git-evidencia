# GA7-220501096-AA1-EV05 · Versionamiento con GIT · Eagle Box (PowerShell)
# Uso:  .\setup-evidencia.ps1 -Email "mi_correo@dominio.com"
# Requisito: repositorio VACÍO "Programa-Git" creado previamente en GitHub.
param([string]$Email = "tu_correo@dominio.com")
$ErrorActionPreference = "Stop"
$Nombre = "Jaime Andrés Bejarano Pautt"; $Url = "https://github.com/jaime-bejarano/Programa-Git.git"

git --version
if (-not (git config --global user.name))  { git config --global user.name  $Nombre }
if (-not (git config --global user.email)) { git config --global user.email $Email }

New-Item -ItemType Directory -Force -Path Programa-Git | Out-Null; Set-Location Programa-Git
git init
git remote add github $Url
git remote -v

"# Programa-Git" | Out-File -Encoding utf8 README.md
git add README.md; git commit -m "Commit inicial"
git push github master

"Nombre: $Nombre" | Out-File -Encoding utf8 kotlin.txt
"Correo: $Email"  | Out-File -Encoding utf8 -Append kotlin.txt
git add .
git commit -m "Añadido datos."
git remote add origin $Url 2>$null
git push origin master
git log --oneline
