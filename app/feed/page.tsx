"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/current-user";
import { useCourses } from "@/lib/hooks";
import { useI18n } from "@/lib/i18n/context";
import { EmptyState } from "@/components/EmptyState";
import { PostCardSkeleton } from "@/components/PostCardSkeleton";

export default function FeedIndexPage() {
  const { user } = useCurrentUser();
  const { t } = useI18n();
  const router = useRouter();
  const { data, isLoading } = useCourses(user.id);

  const firstEnrolled = data?.courses.find((c) => c.isEnrolled);

  useEffect(() => {
    if (firstEnrolled) {
      router.replace(`/feed/${firstEnrolled.id}`);
    }
  }, [firstEnrolled, router]);

  if (isLoading || firstEnrolled) {
    return (
      <div className="space-y-4">
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    );
  }

  return <EmptyState title={t("feed.forbidden.title")} body={t("feed.forbidden.body")} />;
}
