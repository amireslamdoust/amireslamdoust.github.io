import type { ThemeState } from '@domain/models/theme';

export interface DocumentThemeWriter {
  apply(state: ThemeState): void;
}

/** Writes theme attributes to the document element for CSS token resolution. */
export class DocumentThemeAdapter implements DocumentThemeWriter {
  apply(state: ThemeState): void {
    const root = document.documentElement;
    root.dataset.theme = state.brand;
    root.dataset.colorScheme = state.colorScheme;
    root.style.colorScheme = state.colorScheme;
  }
}

export class NoopDocumentThemeAdapter implements DocumentThemeWriter {
  apply(_state: ThemeState): void {
    // SSR / tests
  }
}
