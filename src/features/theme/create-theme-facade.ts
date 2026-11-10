import { DocumentThemeAdapter } from '@shared/adapters/document-theme-adapter';
import { LocalStorageAdapter } from '@shared/adapters/local-storage-adapter';
import { ThemeFacade } from './theme-facade';

let singleton: ThemeFacade | undefined;

/** Browser composition root for the theme facade. */
export function getThemeFacade(): ThemeFacade {
  if (!singleton) {
    singleton = new ThemeFacade({
      storage: new LocalStorageAdapter(),
      documentWriter: new DocumentThemeAdapter(),
    });
  }
  return singleton;
}

export function resetThemeFacadeForTests(): void {
  singleton = undefined;
}
