"use client";

import { languages } from "@/app/i18n/settings";
import { useT } from "@/app/i18n/client";
import { OptionalI18n, LANGUAGE_MAP, FALLBACK_MOBILE_M_SCREEN_WIDTH } from "@/app/lib/constants";
import { ResponsiveContextValue, useResponsiveContext } from "@/app/[lng]/components/ResponsiveContext";

export default function Main() {
  const { t }: OptionalI18n = useT("locale", {});
  const { width, isTabletScreen, isMobileScreen }: ResponsiveContextValue = useResponsiveContext();

  return (
    <main className="w-full pb-[130px] bg-[var(--theme-bg-base)]">
      <div className="w-full max-w-screen-xl mx-auto px-[25px]">
        <h1 className="text-[var(--theme-fg-base)] text-2xl font-semibold mb-8">
          {t("main.title")}
        </h1>
        <nav className={`grid gap-x-[5vw] gap-y-[20px] ${isTabletScreen ? `${isMobileScreen ? `${width < FALLBACK_MOBILE_M_SCREEN_WIDTH ? "grid-cols-[1fr]" : "grid-cols-[1fr_1fr]"}` : "grid-cols-[1fr_1fr_1fr_1fr]"}` : "grid-cols-[1fr_1fr_1fr_1fr]"} justify-start`}>
          {languages.map((lang) => {
            const item = LANGUAGE_MAP[lang];
            if (!item) return null;

            return (
              <a
                key={lang}
                href={`/${lang}`}
                className="text-[var(--theme-primary-light)] underline"
              >
                {item.region} - {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
