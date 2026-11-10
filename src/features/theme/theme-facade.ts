import type { StoragePort } from '@domain/ports/storage-port';
import type { ThemePort } from '@domain/ports/theme-port';
import {
  DEFAULT_THEME_STATE,
  isBrandThemeId,
  isColorScheme,
  type BrandThemeId,
  type ColorScheme,
  type ThemeState,
} from '@domain/models/theme';
import type { DocumentThemeWriter } from '@shared/adapters/document-theme-adapter';
import { THEME_STORAGE_KEY } from '@shared/lib/paths';

interface ThemeFacadeDeps {
  readonly storage: StoragePort;
  readonly documentWriter: DocumentThemeWriter;
  readonly storageKey?: string;
}

/**
 * Facade over persistence + document attributes.
 * UI components depend on ThemePort, never on localStorage/DOM APIs.
 */
export class ThemeFacade implements ThemePort {
  readonly #storage: StoragePort;
  readonly #documentWriter: DocumentThemeWriter;
  readonly #storageKey: string;

  constructor(deps: ThemeFacadeDeps) {
    this.#storage = deps.storage;
    this.#documentWriter = deps.documentWriter;
    this.#storageKey = deps.storageKey ?? THEME_STORAGE_KEY;
  }

  read(): ThemeState {
    const raw = this.#storage.getItem(this.#storageKey);
    if (!raw) return DEFAULT_THEME_STATE;
    try {
      const parsed: unknown = JSON.parse(raw);
      return coerceThemeState(parsed);
    } catch {
      return DEFAULT_THEME_STATE;
    }
  }

  write(state: ThemeState): void {
    this.#storage.setItem(this.#storageKey, JSON.stringify(state));
  }

  apply(state: ThemeState): void {
    this.#documentWriter.apply(state);
  }

  toggleColorScheme(): ThemeState {
    const current = this.read();
    const next: ThemeState = {
      ...current,
      colorScheme: current.colorScheme === 'light' ? 'dark' : 'light',
    };
    this.persistAndApply(next);
    return next;
  }

  setBrand(brand: BrandThemeId): ThemeState {
    const next: ThemeState = { ...this.read(), brand };
    this.persistAndApply(next);
    return next;
  }

  setColorScheme(scheme: ColorScheme): ThemeState {
    const next: ThemeState = { ...this.read(), colorScheme: scheme };
    this.persistAndApply(next);
    return next;
  }

  private persistAndApply(state: ThemeState): void {
    this.write(state);
    this.apply(state);
  }
}

function coerceThemeState(value: unknown): ThemeState {
  if (!value || typeof value !== 'object') return DEFAULT_THEME_STATE;
  const record = value as Record<string, unknown>;
  const brand =
    typeof record.brand === 'string' && isBrandThemeId(record.brand)
      ? record.brand
      : DEFAULT_THEME_STATE.brand;
  const colorScheme =
    typeof record.colorScheme === 'string' && isColorScheme(record.colorScheme)
      ? record.colorScheme
      : DEFAULT_THEME_STATE.colorScheme;
  return { brand, colorScheme };
}
