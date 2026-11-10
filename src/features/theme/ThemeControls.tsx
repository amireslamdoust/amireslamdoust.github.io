import { useEffect, useState } from 'react';
import {
  THEME_DEFINITIONS,
  type BrandThemeId,
  type ColorScheme,
  type ThemeState,
} from '@domain/models/theme';
import { IconMoon, IconSun } from '@design-system/icons/Icons';
import { getThemeFacade } from './create-theme-facade';

export function ThemeControls() {
  const [state, setState] = useState<ThemeState | null>(null);

  useEffect(() => {
    const facade = getThemeFacade();
    const current = facade.read();
    facade.apply(current);
    setState(current);
  }, []);

  if (!state) {
    return (
      <div className="cluster" aria-hidden="true">
        <span className="icon-btn" />
      </div>
    );
  }

  const facade = getThemeFacade();

  const setBrand = (brand: BrandThemeId) => {
    setState(facade.setBrand(brand));
  };

  const toggleScheme = () => {
    setState(facade.toggleColorScheme());
  };

  const schemeLabel: Record<ColorScheme, string> = {
    light: 'Switch to dark',
    dark: 'Switch to light',
  };

  return (
    <div className="cluster" role="group" aria-label="Theme controls">
      <label className="no-print" style={{ display: 'inline-flex', gap: '0.35rem', alignItems: 'center' }}>
        <span className="visually-hidden">Brand theme</span>
        <select
          aria-label="Brand theme"
          value={state.brand}
          onChange={(event) => setBrand(event.target.value as BrandThemeId)}
          style={{
            minHeight: '2.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-ink)',
            padding: '0 0.65rem',
            font: 'inherit',
          }}
        >
          {THEME_DEFINITIONS.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="icon-btn"
        onClick={toggleScheme}
        aria-label={schemeLabel[state.colorScheme]}
        title={schemeLabel[state.colorScheme]}
      >
        {state.colorScheme === 'light' ? (
          <IconMoon title="Dark" />
        ) : (
          <IconSun title="Light" />
        )}
      </button>
    </div>
  );
}
