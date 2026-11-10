export const BRAND_THEMES = ['neutral', 'ink', 'field'] as const;
export type BrandThemeId = (typeof BRAND_THEMES)[number];

export const COLOR_SCHEMES = ['light', 'dark'] as const;
export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export interface ThemeState {
  readonly brand: BrandThemeId;
  readonly colorScheme: ColorScheme;
}

export interface ThemeDefinition {
  readonly id: BrandThemeId;
  readonly label: string;
  readonly description: string;
}

export const THEME_DEFINITIONS = [
  {
    id: 'neutral',
    label: 'Neutral',
    description: 'Calm typographic default',
  },
  {
    id: 'ink',
    label: 'Ink',
    description: 'High-contrast editorial',
  },
  {
    id: 'field',
    label: 'Field',
    description: 'Warm earth accent system',
  },
] as const satisfies readonly ThemeDefinition[];

export const DEFAULT_THEME_STATE: ThemeState = {
  brand: 'neutral',
  colorScheme: 'light',
};

export function isBrandThemeId(value: string): value is BrandThemeId {
  return (BRAND_THEMES as readonly string[]).includes(value);
}

export function isColorScheme(value: string): value is ColorScheme {
  return (COLOR_SCHEMES as readonly string[]).includes(value);
}
