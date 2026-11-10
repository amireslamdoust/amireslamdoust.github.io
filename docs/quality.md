# Quality bar

## Automated

- `pnpm lint:content` — forbidden product names, phone, MSc
- `pnpm test` — ThemeFacade, CommandRegistry, content policy
- `pnpm build` — static Astro output
- CI + Deploy workflows on `main`
- Playwright smoke + axe (`pnpm test:e2e` after `pnpm build`)

## Manual / follow-up

- Lighthouse (mobile + desktop) on production: target 95+ Performance / A11y / Best Practices / SEO
- VoiceOver pass on home + one case study
- Theme switcher across Neutral / Ink / Field × light / dark
