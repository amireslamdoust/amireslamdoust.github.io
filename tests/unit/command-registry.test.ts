import { describe, expect, it } from 'vitest';
import { CommandRegistry } from '@features/command-palette/command-registry';

describe('CommandRegistry', () => {
  it('lists navigation and theme commands', () => {
    const registry = new CommandRegistry();
    const all = registry.list();
    expect(all.some((command) => command.id === 'nav-home')).toBe(true);
    expect(all.some((command) => command.id === 'theme-field')).toBe(true);
  });

  it('searches by keyword', () => {
    const registry = new CommandRegistry();
    const hits = registry.search('stripe');
    expect(hits.some((command) => command.id === 'nav-saas')).toBe(true);
  });
});
