"use client";

import { use } from "react";
import { useCurrentUser } from "@/lib/current-user";
import { useCourses, useFeed, useToggleSave, useRemovePost } from "@/lib/hooks";
import { useI18n } from "@/lib/i18n/context";
import { ApiError } from "@/lib/api-client";
import { CourseSwitcher } from "@/components/CourseSwitcher";
import { PostCard } from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/PostCardSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { RightSidebar } from "@/components/RightSidebar";

export default function FeedPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { user } = useCurrentUser();
  const { t } = useI18n();

  const coursesQuery = useCourses(user.id);
  const feedQuery = useFeed(user.id, courseId);
  const toggleSave = useToggleSave(user.id, courseId);
  const removePost = useRemovePost(user.id, courseId);

  if (feedQuery.isError) {
    const err = feedQuery.error;
    if (err instanceof ApiError && err.status === 403) {
      return <EmptyState title={t("feed.forbidden.title")} body={t("feed.forbidden.body")} />;
    }
    if (err instanceof ApiError && err.status === 404) {
      return <EmptyState title={t("feed.notFound.title")} body={t("feed.notFound.body")} />;
    }
    return (
      <EmptyState
        title={t("feed.error")}
        body=""
        action={
          <button onClick={() => feedQuery.refetch()} className="rounded-full bg-moss-600 px-4 py-1.5 text-sm text-white">
            {t("action.retry")}
          </button>
        }
      />
    );
  }

  const posts = feedQuery.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="space-y-6">
       <div className="space-y-1 page-hero grid grid-cols-2 lg:grid-cols-2 gap-1 bg-remove">
          <div className="px-6 pt-9">
            <div className="text-sm text-purple-600 font-semibold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90 float-left">
                <path d="M12 2l3 6h6l-4.8 3.6L20 20l-8-5-8 5 1.8-8.4L1 8h6L12 2z" fill="#7c3aed"></path>
              </svg> 
              DISCUSSION FORUM</div>
            <h1 className="__className_f367f3 text-6xl font-extrabold text-ink-950">{t("feed.title")}</h1>
            <p className="text-base text-ink-800 mt-2">{t("feed.subtitle")}</p>
          </div>
          <div className="max-w-2xl mx-auto px-6 mt-4">
            <img src="https://cabletron.ae/img/bg_heading.png" alt="" className="rounded-3xl" />
          </div>
        </div>
      <div className="max-w-7xl mx-auto px-6">
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="max-w-5xl mx-auto px-6">
          {coursesQuery.data ? <CourseSwitcher courses={coursesQuery.data.courses} activeCourseId={courseId} /> : null}

          {feedQuery.isLoading ? (
            <div className="space-y-4 mt-4">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          ) : posts.length === 0 ? (
            <EmptyState title={t("feed.empty.title")} body={t("feed.empty.body")} />
          ) : (
            <div className="space-y-5 mt-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isModerator={user.role === "moderator"}
                  isTogglePending={toggleSave.isPending && toggleSave.variables?.postId === post.id}
                  onToggleSave={() => toggleSave.mutate({ postId: post.id, nextSaved: !post.hasSaved })}
                  onRemove={() => removePost.mutate(post.id)}
                />
              ))}
            </div>
          )}

          {feedQuery.hasNextPage ? (
            <div className="pt-2 text-center">
              <button
                onClick={() => feedQuery.fetchNextPage()}
                disabled={feedQuery.isFetchingNextPage}
                className="rounded-full border border-amber-200 bg-white px-5 py-2 text-sm text-amber-800 hover:border-amber-300 disabled:opacity-50"
              >
                {feedQuery.isFetchingNextPage ? t("feed.loading") : t("feed.loadMore")}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="lg:col-span-1 max-w-sm mx-auto px-6">
        <RightSidebar posts={posts} />
      </div>
    </div>
      </div>
    
  );
}
