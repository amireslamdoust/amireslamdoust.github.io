import type { CommandDefinition } from '../models/command';

export interface CommandPort {
  list(): readonly CommandDefinition[];
  search(query: string): readonly CommandDefinition[];
  getById(id: string): CommandDefinition | undefined;
}
