const configuredBase = import.meta.env.BASE_URL ?? '/';

/** Normalize Astro BASE_URL into a trailing-slash path prefix. */
export function getBasePath(): string {
  if (configuredBase === '/') return '/';
  return configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;
}

export function withBase(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  const base = getBasePath();
  if (base === '/') return `/${normalized}`;
  return `${base}${normalized}`;
}

export const SITE_URL = 'https://amireslamdoust.github.io';
export const CV_PDF_PATH = '/cv/amir-eslamdoust.pdf';
export const THEME_STORAGE_KEY = 'ae-portfolio-theme';
