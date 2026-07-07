import type { useI18n } from "./i18n/context";

type T = ReturnType<typeof useI18n>["t"];

/** Formats a timestamp as "3 minutes ago" / "hace 3 minutos" via the message catalog. */
export function formatRelativeTime(date: Date, t: T, now: number = Date.now()): string {
  const diffMs = now - date.getTime();
  const minutes = Math.round(diffMs / 60_000);

  if (minutes < 1) return t("time.justNow");
  if (minutes < 60) return t("time.minutesAgo", { count: minutes });

  const hours = Math.round(minutes / 60);
  if (hours < 24) return t("time.hoursAgo", { count: hours });

  const days = Math.round(hours / 24);
  return t("time.daysAgo", { count: days });
}
