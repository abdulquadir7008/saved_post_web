"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/lib/current-user";
import { useSavedPosts, useToggleSave } from "@/lib/hooks";
import { useI18n } from "@/lib/i18n/context";
import { ApiError } from "@/lib/api-client";
import { SavedPostCard } from "@/components/SavedPostCard";
import { SavedOverview } from "@/components/SavedOverview";
import { PostCardSkeleton } from "@/components/PostCardSkeleton";
import { EmptyState } from "@/components/EmptyState";

export default function SavedPage() {
  const { user } = useCurrentUser();
  const { t } = useI18n();
  const [hasMounted, setHasMounted] = useState(false);
  const savedQuery = useSavedPosts(user.id);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  // Un-saving from this page targets whatever course that post belongs to;
  // the mutation only needs courseId to know which feed cache to patch, and
  // it degrades gracefully (no-op patch) if that feed isn't cached.
  const toggleSave = useToggleSave(user.id, "");

  if (savedQuery.isError) {
    const err = savedQuery.error;
    if (err instanceof ApiError && err.status === 401) {
      return <EmptyState title={t("feed.forbidden.title")} body={t("feed.forbidden.body")} />;
    }
    return (
      <EmptyState
        title={t("saved.error")}
        body=""
        action={
          <button onClick={() => savedQuery.refetch()} className="rounded-full bg-moss-600 px-4 py-1.5 text-sm text-white">
            {t("action.retry")}
          </button>
        }
      />
    );
  }

  const posts = savedQuery.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="space-y-10">
      <div className=" from-white via-amber-50 to-purple-50">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="space-y-3">
            
            <h1 className="max-w-2xl text-5xl font-extrabold text-ink-950">Saved <span className="text-purple-700 ">Posts</span></h1>
            <p className="max-w-xl text-base leading-7 text-ink-800/80">Everything you've bookmarked, most recent first.</p>
          </div>
          <div className="rounded-3xl px-6 py-5">
          <img src="https://cabletron.ae/img/saved-post.png" alt="" className="rounded-3xl" />
            
          </div>
        </div>
      </div>

      {savedQuery.isLoading ? (
        <div className="space-y-4">
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      ) : !hasMounted ? (
        <div className="space-y-4">
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          title={t("saved.empty.title")}
          body={t("saved.empty.body")}
          action={
            <Link href="/feed" className="rounded-full bg-moss-600 px-4 py-1.5 text-sm text-white">
              {t("saved.empty.cta")}
            </Link>
          }
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_0.95fr]">
          <div className="space-y-6">
            {posts.map((post) => (
              <SavedPostCard
                key={post.id}
                post={post}
                isTogglePending={toggleSave.isPending && toggleSave.variables?.postId === post.id}
                onToggleSave={() => toggleSave.mutate({ postId: post.id, nextSaved: !post.hasSaved })}
              />
            ))}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <SavedOverview total={posts.length} topics={Math.max(6, Math.min(12, Math.floor(posts.length * 0.7)))} readingTime="8h 35m" />
            <div className="rounded-[2rem] border border-purple-100 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-700 p-6 text-white shadow-2xl shadow-purple-700/20">
              <p className="text-sm uppercase tracking-[0.24em] text-purple-300">Stay organized</p>
              <h2 className="mt-4 text-2xl font-semibold">Keep everything you need in one place and never lose track again.</h2>
              <button className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-purple-950 transition hover:bg-slate-100">
                Explore more posts
              </button>
            </div>
          </aside>
        </div>
      )}

      {savedQuery.hasNextPage ? (
        <div className="pt-2 text-center">
          <button
            onClick={() => savedQuery.fetchNextPage()}
            disabled={savedQuery.isFetchingNextPage}
            className="rounded-full border border-ink-900/15 bg-white px-5 py-2 text-sm text-ink-800 hover:border-moss-500 disabled:opacity-50"
          >
            {savedQuery.isFetchingNextPage ? t("saved.loading") : t("saved.loadMore")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
