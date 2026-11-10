import { describe, expect, it } from 'vitest';
import { ThemeFacade } from '@features/theme/theme-facade';
import { MemoryStorageAdapter } from '@shared/adapters/local-storage-adapter';
import type { ThemeState } from '@domain/models/theme';

class CaptureWriter {
  last: ThemeState | null = null;
  apply(state: ThemeState): void {
    this.last = state;
  }
}

describe('ThemeFacade', () => {
  it('defaults to neutral light when storage is empty', () => {
    const facade = new ThemeFacade({
      storage: new MemoryStorageAdapter(),
      documentWriter: new CaptureWriter(),
    });
    expect(facade.read()).toEqual({ brand: 'neutral', colorScheme: 'light' });
  });

  it('persists brand and toggles color scheme', () => {
    const writer = new CaptureWriter();
    const facade = new ThemeFacade({
      storage: new MemoryStorageAdapter(),
      documentWriter: writer,
    });

    expect(facade.setBrand('ink')).toEqual({ brand: 'ink', colorScheme: 'light' });
    expect(writer.last).toEqual({ brand: 'ink', colorScheme: 'light' });
    expect(facade.toggleColorScheme()).toEqual({ brand: 'ink', colorScheme: 'dark' });
    expect(facade.read()).toEqual({ brand: 'ink', colorScheme: 'dark' });
  });

  it('recovers from corrupt storage JSON', () => {
    const storage = new MemoryStorageAdapter();
    storage.setItem('ae-portfolio-theme', '{not-json');
    const facade = new ThemeFacade({
      storage,
      documentWriter: new CaptureWriter(),
    });
    expect(facade.read()).toEqual({ brand: 'neutral', colorScheme: 'light' });
  });
});
