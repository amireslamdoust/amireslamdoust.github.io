import type { BrandThemeId, ColorScheme, ThemeState } from '../models/theme';

export interface ThemePort {
  read(): ThemeState;
  write(state: ThemeState): void;
  apply(state: ThemeState): void;
  toggleColorScheme(): ThemeState;
  setBrand(brand: BrandThemeId): ThemeState;
  setColorScheme(scheme: ColorScheme): ThemeState;
}
