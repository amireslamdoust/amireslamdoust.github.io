import { Command } from 'cmdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CommandDefinition } from '@domain/models/command';
import { isBrandThemeId } from '@domain/models/theme';
import { AMIR_IDENTITY } from '@domain/models/identity';
import { withBase } from '@shared/lib/paths';
import { getThemeFacade } from '@features/theme/create-theme-facade';
import { IconSearch } from '@design-system/icons/Icons';
import { CommandRegistry } from './command-registry';

const registry = new CommandRegistry();

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const results = useMemo(() => registry.search(query), [query]);

  const runCommand = useCallback(async (command: CommandDefinition) => {
    const theme = getThemeFacade();

    if (command.action === 'copy-email') {
      await navigator.clipboard?.writeText(AMIR_IDENTITY.contact.email);
      setOpen(false);
      return;
    }

    if (command.action === 'toggle-scheme') {
      theme.toggleColorScheme();
      setOpen(false);
      return;
    }

    if (command.action === 'set-theme' && command.themeId && isBrandThemeId(command.themeId)) {
      theme.setBrand(command.themeId);
      setOpen(false);
      return;
    }

    if (command.href) {
      const href = command.href.startsWith('http')
        ? command.href
        : withBase(command.href.replace(/^\//, ''));
      if (command.href.startsWith('http') || command.href.endsWith('.pdf')) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.assign(href);
      }
      setOpen(false);
    }
  }, []);

  return (
    <div data-command-root className="no-print">
      <button
        type="button"
        className="icon-btn"
        aria-label="Open command palette"
        title="Command palette (Ctrl/Cmd+K)"
        onClick={() => setOpen(true)}
      >
        <IconSearch title="Search" />
      </button>

      {open ? (
        <div
          role="presentation"
          className="command-palette-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 80,
            background: 'color-mix(in oklab, var(--color-ink) 35%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setOpen(false)}
        >
          <Command
            label="Command palette"
            style={{
              width: 'min(560px, calc(100vw - 2rem))',
              margin: '0 auto',
              background: 'var(--color-bg-elevated)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-2)',
              overflow: 'hidden',
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search projects, experience, contact…"
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '1px solid var(--color-border)',
                padding: '1rem 1.1rem',
                font: 'inherit',
                background: 'transparent',
                color: 'inherit',
                outline: 'none',
              }}
            />
            <Command.List style={{ maxHeight: '320px', overflow: 'auto', padding: '0.5rem' }}>
              <Command.Empty style={{ padding: '1rem', color: 'var(--color-muted)' }}>
                No matches.
              </Command.Empty>
              {(['navigate', 'actions', 'theme'] as const).map((group) => {
                const items = results.filter((item) => item.group === group);
                if (items.length === 0) return null;
                return (
                  <Command.Group
                    key={group}
                    heading={group}
                    style={{
                      padding: '0.35rem 0.5rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {items.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={`${item.label} ${item.keywords.join(' ')}`}
                        onSelect={() => {
                          void runCommand(item);
                        }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          padding: '0.65rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          color: 'var(--color-ink)',
                          textTransform: 'none',
                          letterSpacing: 'normal',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                        }}
                      >
                        <span>{item.label}</span>
                        {item.shortcutHint ? (
                          <span className="kbd">{item.shortcutHint}</span>
                        ) : null}
                      </Command.Item>
                    ))}
                  </Command.Group>
                );
              })}
            </Command.List>
          </Command>
        </div>
      ) : null}
    </div>
  );
}
