import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.{test,spec}.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@domain': path.resolve(root, 'src/domain'),
      '@design-system': path.resolve(root, 'src/design-system'),
      '@features': path.resolve(root, 'src/features'),
      '@shared': path.resolve(root, 'src/shared'),
      '@diagrams': path.resolve(root, 'src/diagrams'),
      '@content': path.resolve(root, 'src/content'),
    },
  },
});
