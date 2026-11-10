import type { StoragePort } from '@domain/ports/storage-port';

/** Browser localStorage adapter. Safe no-op when storage is unavailable. */
export class LocalStorageAdapter implements StoragePort {
  getItem(key: string): string | null {
    try {
      return globalThis.localStorage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      globalThis.localStorage?.setItem(key, value);
    } catch {
      // Private mode / quota — ignore persistence failures.
    }
  }

  removeItem(key: string): void {
    try {
      globalThis.localStorage?.removeItem(key);
    } catch {
      // ignore
    }
  }
}

export class MemoryStorageAdapter implements StoragePort {
  #store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.#store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.#store.set(key, value);
  }

  removeItem(key: string): void {
    this.#store.delete(key);
  }
}
