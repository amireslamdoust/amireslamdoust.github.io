import type { CommandDefinition } from '@domain/models/command';
import type { CommandPort } from '@domain/ports/command-port';
import { THEME_DEFINITIONS } from '@domain/models/theme';
import { AMIR_IDENTITY } from '@domain/models/identity';
import { CV_PDF_PATH } from '@shared/lib/paths';

function buildDefaultCommands(): readonly CommandDefinition[] {
  const themeCommands: CommandDefinition[] = THEME_DEFINITIONS.map((theme) => ({
    id: `theme-${theme.id}`,
    label: `Theme: ${theme.label}`,
    group: 'theme',
    keywords: ['theme', theme.id, theme.label.toLowerCase()],
    action: 'set-theme',
    themeId: theme.id,
  }));

  return [
    {
      id: 'nav-home',
      label: 'Home',
      group: 'navigate',
      keywords: ['home', 'top'],
      href: '/',
    },
    {
      id: 'nav-work',
      label: 'Selected work',
      group: 'navigate',
      keywords: ['work', 'projects', 'case'],
      href: '/#work',
    },
    {
      id: 'nav-about',
      label: 'About',
      group: 'navigate',
      keywords: ['about'],
      href: '/#about',
    },
    {
      id: 'nav-experience',
      label: 'Experience',
      group: 'navigate',
      keywords: ['experience', 'timeline', 'career'],
      href: '/#experience',
    },
    {
      id: 'nav-skills',
      label: 'Skills',
      group: 'navigate',
      keywords: ['skills', 'stack'],
      href: '/#skills',
    },
    {
      id: 'nav-contact',
      label: 'Contact',
      group: 'navigate',
      keywords: ['contact', 'email'],
      href: '/#contact',
    },
    {
      id: 'nav-cv',
      label: 'View CV (HTML)',
      group: 'navigate',
      keywords: ['cv', 'resume'],
      href: '/cv',
    },
    {
      id: 'nav-platform',
      label: 'Case study: shared frontend platform',
      group: 'navigate',
      keywords: ['platform', 'design system', 'kollex'],
      href: '/work/shared-frontend-platform',
    },
    {
      id: 'nav-agents',
      label: 'Case study: AI-agent tooling',
      group: 'navigate',
      keywords: ['ai', 'agent', 'mcp'],
      href: '/work/ai-agent-tooling',
    },
    {
      id: 'nav-saas',
      label: 'Case study: SaaS products',
      group: 'navigate',
      keywords: ['saas', 'stripe'],
      href: '/work/saas-products',
    },
    {
      id: 'action-copy-email',
      label: `Copy email (${AMIR_IDENTITY.contact.email})`,
      group: 'actions',
      keywords: ['email', 'copy', 'contact'],
      action: 'copy-email',
    },
    {
      id: 'action-download-cv',
      label: 'Download CV (PDF)',
      group: 'actions',
      keywords: ['cv', 'pdf', 'download'],
      href: CV_PDF_PATH,
    },
    {
      id: 'action-linkedin',
      label: 'Open LinkedIn',
      group: 'actions',
      keywords: ['linkedin'],
      href: AMIR_IDENTITY.contact.linkedIn,
    },
    {
      id: 'action-toggle-scheme',
      label: 'Toggle light / dark',
      group: 'theme',
      keywords: ['dark', 'light', 'scheme', 'mode'],
      shortcutHint: 'D',
      action: 'toggle-scheme',
    },
    ...themeCommands,
  ];
}

/** Typed command registry — open for extension via constructor injection. */
export class CommandRegistry implements CommandPort {
  readonly #commands: readonly CommandDefinition[];

  constructor(commands: readonly CommandDefinition[] = buildDefaultCommands()) {
    this.#commands = commands;
  }

  list(): readonly CommandDefinition[] {
    return this.#commands;
  }

  getById(id: string): CommandDefinition | undefined {
    return this.#commands.find((command) => command.id === id);
  }

  search(query: string): readonly CommandDefinition[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return this.#commands;

    return this.#commands.filter((command) => {
      const haystack = [
        command.label,
        command.id,
        ...command.keywords,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }
}
