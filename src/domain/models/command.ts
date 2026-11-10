export type CommandGroupId = 'navigate' | 'actions' | 'theme';

export interface CommandDefinition {
  readonly id: string;
  readonly label: string;
  readonly group: CommandGroupId;
  readonly keywords: readonly string[];
  readonly shortcutHint?: string;
  readonly href?: string;
  readonly action?: 'copy-email' | 'toggle-scheme' | 'set-theme';
  readonly themeId?: string;
}
