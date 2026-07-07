const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export type Post = {
  id: string;
  courseId: string;
  authorId: string;
  authorName: string;
  title: string;
  body: string;
  createdAt: string;
  hasSaved: boolean;
  savesCount: number;
};

export type SavedPost = Post & { savedAt: string };

export type Page<T> = { items: T[]; nextCursor: string | null };

export type Course = { id: string; name: string; isEnrolled: boolean };

async function request<T>(path: string, userId: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { ...init.headers, "x-user-id": userId, "Content-Type": "application/json" },
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // response wasn't JSON; fall back to statusText
    }
    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<T>;
}

export const api = {
  getCourses: (userId: string) => request<{ courses: Course[] }>("/courses", userId),

  getFeed: (userId: string, courseId: string, cursor?: string | null) =>
    request<Page<Post>>(`/courses/${courseId}/posts${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`, userId),

  getSavedPosts: (userId: string, cursor?: string | null) =>
    request<Page<SavedPost>>(`/saved-posts${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`, userId),

  save: (userId: string, postId: string) =>
    request<{ hasSaved: boolean; savesCount: number }>(`/posts/${postId}/save`, userId, { method: "POST" }),

  unsave: (userId: string, postId: string) =>
    request<{ hasSaved: boolean; savesCount: number }>(`/posts/${postId}/save`, userId, { method: "DELETE" }),

  removePost: (userId: string, postId: string) =>
    request<{ removed: boolean }>(`/posts/${postId}`, userId, { method: "DELETE" }),
};
