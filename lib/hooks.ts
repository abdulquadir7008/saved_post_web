"use client";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { api, ApiError, type Page, type Post, type SavedPost } from "./api-client";
import { queryKeys } from "./query-keys";

export function useCourses(userId: string) {
  return useQuery({
    queryKey: queryKeys.courses(userId),
    queryFn: () => api.getCourses(userId),
  });
}

export function useFeed(userId: string, courseId: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.feed(userId, courseId),
    queryFn: ({ pageParam }) => api.getFeed(userId, courseId, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    retry: (failureCount, error) => !(error instanceof ApiError) && failureCount < 2,
  });
}

export function useSavedPosts(userId: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.saved(userId),
    queryFn: ({ pageParam }) => api.getSavedPosts(userId, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    retry: (failureCount, error) => !(error instanceof ApiError) && failureCount < 2,
  });
}

type FeedData = InfiniteData<Page<Post>>;
type SavedData = InfiniteData<Page<SavedPost>>;

function mapPost<P extends Post>(page: Page<P>, postId: string, patch: Partial<Post>): Page<P> {
  return { ...page, items: page.items.map((p) => (p.id === postId ? { ...p, ...patch } : p)) };
}

/**
 * Toggles save state with an optimistic update so the bookmark button feels
 * instant, then reconciles with the server response. On error, the snapshot
 * taken before the mutation is restored.
 */
export function useToggleSave(userId: string, courseId: string) {
  const queryClient = useQueryClient();
  const feedKey = queryKeys.feed(userId, courseId);
  const savedKey = queryKeys.saved(userId);

  return useMutation({
    mutationFn: ({ postId, nextSaved }: { postId: string; nextSaved: boolean }) =>
      nextSaved ? api.save(userId, postId) : api.unsave(userId, postId),

    onMutate: async ({ postId, nextSaved }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: feedKey }),
        queryClient.cancelQueries({ queryKey: savedKey }),
      ]);

      const previousFeed = queryClient.getQueryData<FeedData>(feedKey);
      const previousSaved = queryClient.getQueryData<SavedData>(savedKey);

      queryClient.setQueryData<FeedData>(feedKey, (data) => {
        if (!data) return data;
        const current = data.pages.flatMap((p) => p.items).find((p) => p.id === postId);
        const delta = nextSaved ? 1 : -1;
        const nextCount = Math.max(0, (current?.savesCount ?? 0) + (current?.hasSaved === nextSaved ? 0 : delta));
        return { ...data, pages: data.pages.map((page) => mapPost(page, postId, { hasSaved: nextSaved, savesCount: nextCount })) };
      });

      // Un-saving removes the item from the saved list immediately, since
      // that list is defined as "currently active saves only".
      if (!nextSaved) {
        queryClient.setQueryData<SavedData>(savedKey, (data) => {
          if (!data) return data;
          return { ...data, pages: data.pages.map((page) => ({ ...page, items: page.items.filter((p) => p.id !== postId) })) };
        });
      }

      return { previousFeed, previousSaved };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousFeed) queryClient.setQueryData(feedKey, context.previousFeed);
      if (context?.previousSaved) queryClient.setQueryData(savedKey, context.previousSaved);
    },

    onSuccess: (result, { postId }) => {
      queryClient.setQueryData<FeedData>(feedKey, (data) => {
        if (!data) return data;
        return { ...data, pages: data.pages.map((page) => mapPost(page, postId, result)) };
      });
    },

    // Saving (but not un-saving) can introduce a post that belongs in the
    // saved list but whose `savedAt` we don't know client-side -- refetch
    // to pick up correct ordering rather than fabricate a timestamp.
    onSettled: (_result, _error, { nextSaved }) => {
      if (nextSaved) {
        queryClient.invalidateQueries({ queryKey: savedKey });
      }
    },
  });
}

export function useRemovePost(userId: string, courseId: string) {
  const queryClient = useQueryClient();
  const feedKey = queryKeys.feed(userId, courseId);
  const savedKey = queryKeys.saved(userId);

  return useMutation({
    mutationFn: (postId: string) => api.removePost(userId, postId),
    onSuccess: (_result, postId) => {
      queryClient.setQueryData<FeedData>(feedKey, (data) => {
        if (!data) return data;
        return { ...data, pages: data.pages.map((page) => ({ ...page, items: page.items.filter((p) => p.id !== postId) })) };
      });
      queryClient.invalidateQueries({ queryKey: savedKey });
    },
  });
}
