import { i18n, TFunction } from "i18next";

export type RequiredI18n = {
  t: TFunction;
  i18n: i18n;
};

export type OptionalI18n = {
  t?: TFunction;
  i18n?: i18n;
};

export type StateSetter<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const COOKIE_KEYS: Record<string, string> = {
  CONSENT: "fides_consent",
  THEME: "theme"
} as const;

export const COOKIE_CATEGORIES: Record<string, string> = {
  ESSENTIAL: "essential",
  MARKETING: "marketing",
  ANALYTICS: "analytics",
  FUNCTIONAL: "functional"
} as const;

export const COOKIE_CATEGORY_MAP: Record<string, string[]> = {
  [COOKIE_CATEGORIES.ESSENTIAL]: [COOKIE_KEYS.THEME],
  [COOKIE_CATEGORIES.MARKETING]: [],
  [COOKIE_CATEGORIES.ANALYTICS]: [],
  [COOKIE_CATEGORIES.FUNCTIONAL]: []
} as const;

export const COOKIE_EXPIRATION_DAYS: number = 365 as const;

export const FALLBACK_COOKIE_CONSENT: Record<string, boolean> = {
  [COOKIE_CATEGORIES.ESSENTIAL]: true,
  [COOKIE_CATEGORIES.MARKETING]: false,
  [COOKIE_CATEGORIES.ANALYTICS]: false,
  [COOKIE_CATEGORIES.FUNCTIONAL]: false
} as const;

export const THEME_KEYS: Record<string, string> = {
  LIGHT: "light",
  SYSTEM: "system",
  DARK: "dark"
} as const;

export const FALLBACK_THEME: string = `${THEME_KEYS.SYSTEM}` as const;

export const FALLBACK_LAPTOP_SCREEN_WIDTH: number = 1152 as const;

export const FALLBACK_TABLET_SCREEN_WIDTH: number = 896 as const;

export const FALLBACK_MOBILE_L_SCREEN_WIDTH: number = 425 as const;

export const FALLBACK_MOBILE_M_SCREEN_WIDTH: number = 375 as const;
