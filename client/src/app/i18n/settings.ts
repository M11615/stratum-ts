import { COOKIE_KEYS, LANGUAGE_MAP, FALLBACK_LANGUAGE } from "@/app/lib/constants";

export const fallbackLng: string = FALLBACK_LANGUAGE;
export const languages: string[] = Object.keys(LANGUAGE_MAP);
export const defaultNS: string = "translation";
export const cookieName: string = COOKIE_KEYS.LANGUAGE;
export const headerName: string = "x-i18next-current-language";
