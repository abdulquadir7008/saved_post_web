"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, SUPPORTED_LOCALES } from "@/lib/i18n/context";
import { useCurrentUser, DEMO_USERS } from "@/lib/current-user";

export function TopNav() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useI18n();
  const { user, setUserId } = useCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-amber-100/50 bg-white backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full brand-accent shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 12c0 4.97 4.03 9 9 9s9-4.03 9-9-4.03-9-9-9-9 4.03-9 9z" fill="#fff" opacity="0.06" />
                <path d="M8 12a4 4 0 114 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="rounded-2xl bg-amber-100/40 px-4 py-2 text-sm font-medium uppercase tracking-[0.12em] text-amber-800">
              {t("app.title")}
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/feed"
              className={
                pathname?.startsWith("/feed")
                  ? "rounded-full bg-white px-4 py-2 font-semibold text-purple-700 shadow-sm"
                  : "rounded-full px-4 py-2 text-amber-700 transition hover:bg-white hover:text-purple-700"
              }
            >
              <span className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 2l3 6h6l-4.8 3.6L20 20l-8-5-8 5 1.8-8.4L1 8h6L12 2z" fill="#7c3aed"/></svg>
                {t("nav.feed")}
              </span>
            </Link>
            <Link
              href="/saved"
              className={
                pathname === "/saved"
                  ? "rounded-full bg-white px-4 py-2 font-semibold text-purple-700 shadow-sm"
                  : "rounded-full px-4 py-2 text-amber-700 transition hover:bg-white hover:text-purple-700"
              }
            >
              <span className="inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M6 2h12v20l-6-3-6 3V2z" fill="#7c3aed"/></svg>
                {t("nav.saved")}
              </span>
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-amber-800">
          <label className="relative flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-2 transition hover:border-amber-300">
            <span className="text-ink-800 text-sm font-bold">{t("user.switchLabel")}</span>
            <select
              value={user.id}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-transparent text-sm text-ink-800 outline-none appearance-none pr-6"
            >
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id} className="text-ink-800">
                  {u.name}
                  {u.role === "moderator" ? ` (${t("moderator.badge")})` : ""}
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-amber-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.1 1.02l-4.25 4.5a.75.75 0 01-1.1 0L5.21 8.27a.75.75 0 01.02-1.06z" />
            </svg>
          </label>

          <label className="relative flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-2 transition hover:border-amber-300">
            <span className="text-ink-800 text-sm font-bold">{t("locale.switchLabel")}</span>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as (typeof SUPPORTED_LOCALES)[number])}
              className="bg-transparent text-sm text-ink-800 outline-none appearance-none uppercase pr-6"
            >
              {SUPPORTED_LOCALES.map((l) => (
                <option key={l} value={l} className="text-ink-800">
                  {l}
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-amber-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.1 1.02l-4.25 4.5a.75.75 0 01-1.1 0L5.21 8.27a.75.75 0 01.02-1.06z" />
            </svg>
          </label>
        </div>
      </div>
    </header>
  );
}
