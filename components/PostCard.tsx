"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { formatRelativeTime } from "@/lib/relative-time";
import { BookmarkRibbon } from "./BookmarkRibbon";
import type { Post } from "@/lib/api-client";

export function PostCard({
  post,
  savedAt,
  isModerator,
  onToggleSave,
  onRemove,
  isTogglePending,
}: {
  post: Post;
  savedAt?: string;
  isModerator: boolean;
  onToggleSave: () => void;
  onRemove?: () => void;
  isTogglePending: boolean;
}) {
  const { t } = useI18n();
  const [createdLabel, setCreatedLabel] = useState(t("time.justNow"));
  const [savedLabel, setSavedLabel] = useState<string | null>(savedAt ? t("time.justNow") : null);

  useEffect(() => {
    setCreatedLabel(formatRelativeTime(new Date(post.createdAt), t));
    if (savedAt) {
      setSavedLabel(formatRelativeTime(new Date(savedAt), t));
    }
  }, [post.createdAt, savedAt, t]);

  return (
    <article className="card-edge relative overflow-hidden rounded-3xl border border-amber-100 bg-white p-6 shadow-xl">
      <span className="list-bar-ts"></span>
      <div className="absolute inset-x-0 top-0 h-1" />
      <BookmarkRibbon saved={post.hasSaved} pending={isTogglePending} onToggle={onToggleSave} />


      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="max-w-3xl text-2xl font-bold tracking-tight text-ink-800">{post.title}</h3>
        <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase text-ink-port shadow-sm">
          {t("post.savesCount", { count: post.savesCount })}
        </span>
      </div>

      <p className="whitespace-pre-line text-sm leading-7 text-ink-800">{post.body}</p>

      <footer className="flex flex-wrap items-center gap-3 py-3 text-sm text-ink-800">
        <span className="font-medium text-ink-port">{t("post.by", { name: post.authorName })}</span>
        <span className="text-ink-port">·</span>
        <time dateTime={post.createdAt}>{createdLabel}</time>
        {savedAt ? (
          <>
            <span className="text-ink-port">·</span>
            <span className="text-ink-port">{t("saved.savedAt", { when: savedLabel ?? t("time.justNow") })}</span>
          </>
        ) : null}
        {isModerator && onRemove ? (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t("moderator.removeConfirm"))) onRemove();
            }}
            className="ml-auto rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-ink-port transition hover:bg-rose-500/20"
          >
            {t("moderator.remove")}
          </button>
        ) : null}
      </footer>
    </article>
  );
}
