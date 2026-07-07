"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { formatRelativeTime } from "@/lib/relative-time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCode, faFileLines, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import type { Post } from "@/lib/api-client";

type SavedPostCardPost = Post & { savedAt?: string };

const categoryMap = [
  { keyword: "assignment", label: "Assignment", color: "amber", icon: faCode },
  { keyword: "study", label: "Study Group", color: "purple", icon: faUsers },
  { keyword: "cheat", label: "Course Material", color: "emerald", icon: faFileLines },
];

function getCategory(post: SavedPostCardPost) {
  const title = post.title.toLowerCase();
  const match = categoryMap.find((item) => title.includes(item.keyword));
  if (match) return match;
  return { keyword: "saved", label: "Saved", color: "slate", icon: faStar };
}

function badgeStyles(color: string) {
  switch (color) {
    case "amber":
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "purple":
      return "bg-purple-50 text-purple-700 border-purple-100";
    case "emerald":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    default:
      return "bg-slate-50 text-slate-700 border-slate-100";
  }
}

function accentStyles(color: string) {
  switch (color) {
    case "amber":
      return "bg-amber-400/80";
    case "purple":
      return "bg-purple-400/80";
    case "emerald":
      return "bg-emerald-400/80";
    default:
      return "bg-slate-400/80";
  }
}

export function SavedPostCard({ post, onToggleSave, isTogglePending }: { post: SavedPostCardPost; onToggleSave: () => void; isTogglePending: boolean }) {
  const { t } = useI18n();
  const [createdLabel, setCreatedLabel] = useState(t("time.justNow"));
  const [savedLabel, setSavedLabel] = useState<string | null>(t("time.justNow"));

  useEffect(() => {
    setCreatedLabel(formatRelativeTime(new Date(post.createdAt), t));
    setSavedLabel(post.savedAt ? formatRelativeTime(new Date(post.savedAt), t) : t("time.justNow"));
  }, [post.createdAt, post.savedAt, t]);

  const category = getCategory(post);
  const badgeClass = badgeStyles(category.color);
  const accentClass = accentStyles(category.color);

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.25)]">
      <div className={`absolute left-0 top-0 h-full w-1 rounded-r-full ${accentClass}`} />
      <div className="relative space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-center gap-4">
            
            <div className="space-y-2">
              
              <h3 className="max-w-xl text-2xl font-semibold text-ink-950">{post.title}</h3>
            </div>
          </div>
          <div className="w-25 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-right text-sm font-semibold text-ink-900">
            <span className="text-[0.75rem] uppercase tracking-[0.2em] text-slate-500">Saves </span>
            {post.savesCount}
          </div>
        </div>

        <p className="text-sm text-ink-800 mrg-pd-0">{post.body}</p>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-sm text-ink-800/80">
          <div className="flex items-center gap-3">
           
            <div className="space-y-1">
              <p className="font-semibold text-ink-900">{post.authorName}</p>
              <p className="text-xs text-ink-800/70">{createdLabel} · Saved {savedLabel}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleSave}
            disabled={isTogglePending}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-wait disabled:opacity-60"
          >
            <FontAwesomeIcon icon={faBookmark} />
            {post.hasSaved ? t("post.unsave") : t("post.save")}
          </button>
        </div>
      </div>
    </article>
  );
}
