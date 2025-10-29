"use client";

import { createContext, useContext } from "react";
import { ResponsiveState, useResponsive } from "@/app/hooks/useResponsive";
import { ThemeState, useTheme } from "@/app/hooks/useTheme";
import { FALLBACK_LAPTOP_SCREEN_WIDTH } from "@/app/lib/constants";

export interface ResponsiveContextValue {
  width: number;
  isTabletScreen: boolean;
  isMobileScreen: boolean;
  actualTheme: string;
  userPreferenceTheme: string
}

const defaultValue: ResponsiveContextValue = {
  width: FALLBACK_LAPTOP_SCREEN_WIDTH,
  isTabletScreen: false,
  isMobileScreen: false,
  actualTheme: "",
  userPreferenceTheme: ""
};

const ResponsiveContext: React.Context<ResponsiveContextValue> = createContext<ResponsiveContextValue>(defaultValue);

export const useResponsiveContext = (): ResponsiveContextValue => useContext<ResponsiveContextValue>(ResponsiveContext);

export default function ResponsiveProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  const { width, isTabletScreen, isMobileScreen }: ResponsiveState = useResponsive();
  const { actualTheme, userPreferenceTheme }: ThemeState = useTheme();

  return (
    <ResponsiveContext.Provider
      value={{
        width, isTabletScreen, isMobileScreen,
        actualTheme, userPreferenceTheme
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};
