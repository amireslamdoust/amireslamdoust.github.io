/** @type {import('lint-staged').Configuration} */
export default {
  '*.{js,mjs,cjs,ts,tsx,astro}': ['eslint --max-warnings=0 --fix'],
  '*.{css,md,json,yml,yaml}': ['prettier --write'],
};
