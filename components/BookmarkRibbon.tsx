"use client";

import { useI18n } from "@/lib/i18n/context";

export function BookmarkRibbon({
  saved,
  pending,
  onToggle,
}: {
  saved: boolean;
  pending: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={pending}
      aria-pressed={saved}
      aria-label={saved ? t("post.unsave") : t("post.save")}
      className="absolute right-14 top-1/2 z-10 rounded-3xl bg-amber-50/60 p-3 text-ink-900 shadow-sm transition hover:-translate-y-1 hover:bg-amber-100/70 disabled:cursor-wait disabled:opacity-60 md:-translate-y-1/2"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="transition-colors duration-200">
        <path
          d="M6 2.75C5.393 2.75 4.9 3.243 4.9 3.85V20.5C4.9 21.16 5.61 21.58 6.16 21.23L12 17.45L17.84 21.23C18.39 21.58 19.1 21.16 19.1 20.5V3.85C19.1 3.243 18.607 2.75 18 2.75H6Z"
          fill={saved ? "#333" : "#caa78a"}
          stroke={saved ? "#333" : "#927d66"}
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
