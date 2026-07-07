"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { formatMessage } from "./format";

export const SUPPORTED_LOCALES = ["en", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

const CATALOGS: Record<Locale, Record<string, string>> = { en, es };
const STORAGE_KEY = "saved-posts.locale";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (SUPPORTED_LOCALES as readonly string[]).includes(stored)) {
      setLocaleState(stored as Locale);
    }
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const t = useMemo(() => {
    const catalog = CATALOGS[locale];
    return (key: string, values?: Record<string, string | number>) => {
      const template = catalog[key] ?? CATALOGS.en[key] ?? key;
      return formatMessage(template, locale, values);
    };
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
