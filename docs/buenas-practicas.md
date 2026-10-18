# Buenas prácticas de versionamiento · Eagle Box

## Conventional Commits 1.0.0
Formato: `<tipo>(<alcance>): <descripción>`

| Tipo | Uso | Ejemplo |
|---|---|---|
| feat | Nueva funcionalidad | `feat(orders): add delivery status endpoint` |
| fix | Corrección de error | `fix(tracking): handle null GPS coordinates` |
| docs | Documentación / datos | `docs(config): add author data` |
| refactor | Cambio interno sin alterar comportamiento | `refactor(routing): extract distance matrix` |
| test | Pruebas | `test(auth): cover token expiry` |
| chore / ci | Mantenimiento y pipelines | `ci: add GitHub Actions build` |

## Flujo con Pull Requests
```
git switch -c feature/author-data
git add kotlin.txt
git commit -m "docs(config): add author data"
git push -u origin feature/author-data
# Abrir Pull Request → revisión → merge a main
```

## Branch Protection (Settings → Branches → Add rule → `main`)
- Require a pull request before merging (≥ 1 aprobación)
- Require status checks to pass before merging (CI)
- Block force pushes / Restrict deletions
- Require signed commits (opcional)

## Rama principal
Usar `main`: `git config --global init.defaultBranch main` o `git branch -M main && git push -u origin main`.
