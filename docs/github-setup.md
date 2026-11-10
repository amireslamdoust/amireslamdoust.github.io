# GitHub Pages setup

1. Repository: `amireslamdoust/amireslamdoust.github.io` (public user site).
2. Settings → Pages → Source: **GitHub Actions**.
3. Push to `main` runs `.github/workflows/deploy.yml`.
4. Live URL: https://amireslamdoust.github.io

Local:

```bash
pnpm install
pnpm dev
pnpm ci
```
