# amireslamdoust.github.io

Personal portfolio of **Amir Eslamdoust** — Senior Frontend / Full-Stack engineer in Berlin.

Live: [https://amireslamdoust.github.io](https://amireslamdoust.github.io)

This site is a hiring artifact and a small **design system** demo: live brand themes, light/dark, token-driven CSS, and a ⌘K command palette. The repository structure is intentional — domain ports, facades, and adapters — so the source itself reads like Staff-level TypeScript.

## Stack

- Astro (static) + TypeScript (strict) + React islands
- CSS design tokens (OKLCH), no WebGL
- Vitest + content lint + Playwright (axe)
- GitHub Actions → GitHub Pages

## Architecture

```text
src/
  domain/           models, ports, content policies
  design-system/    tokens, icons, patterns
  features/         ThemeFacade, CommandRegistry, ContentQueryFacade
  shared/adapters/  localStorage + document theme adapters
  content/          verified facts as data
  pages/            composition root
```

## Scripts

```bash
pnpm install
pnpm dev
pnpm test
pnpm lint:content
pnpm build
pnpm ci
```

## Content rules

- No private product names
- No phone number on the public site
- No invented metrics
- CV: HTML `/cv` + PDF at `/cv/amir-eslamdoust.pdf`

See `docs/adr/0001-stack.md` for the stack decision.
