# ADR 0001 — Stack and layering

## Status

Accepted

## Context

This repository is a public hiring artifact for Amir Eslamdoust. It must deploy to GitHub Pages as static files, demonstrate design-system craft, and read as Staff-level TypeScript when opened in an interview.

## Decision

- **Astro 5** with static output, TypeScript strict, MDX, and React islands only for interactive chrome (theme + command palette).
- **CSS design tokens** (OKLCH semantic variables) with brand theme × color-scheme axes. No Tailwind as the system of record. No WebGL / 3D.
- **Layered architecture:** `domain` (models, ports, policies) → `shared/adapters` + `features/*` facades → `design-system` → `app` pages.
- **Facades** for Theme, Commands, and Content queries so UI never touches `localStorage` / document attributes / raw content modules directly.

## Consequences

- Excellent default performance and progressive enhancement for recruiters.
- Interactive demos stay small (islands).
- No server features on Pages without a separate host.
- Architecture is slightly more formal than a typical portfolio — intentional, because the repo is the portfolio.
