"use client";

import { useI18n } from "@/lib/i18n/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComments, faUsers } from "@fortawesome/free-solid-svg-icons";

export function RightSidebar({ posts }: { posts: Array<any> }) {
  const { t } = useI18n();

  const totalDiscussions = posts.length;
  const activeMembers = Array.from(new Set(posts.map((p) => p.authorId))).length + 120; // base
  const savedPosts = posts.reduce((s, p) => s + (p.savesCount || 0), 0);

  return (
    <aside className="right-panel w-full">
      <div className="mb-6 text-center engage-learn-card">
        <div className="mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-200 to-amber-100 flex items-center justify-center">
          <img src="https://cabletron.ae/img/cups.png" alt="" />
        </div>
        <h3 className="text-lg font-bold text-purple-800">Engage & Learn</h3>
        <p className="text-sm text-ink-800">Ask questions, share ideas, and help each other succeed.</p>
      </div>

      <ul className="space-y-4">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
              <FontAwesomeIcon icon={faComments} className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-800">{totalDiscussions}</div>
              <div className="text-sm text-ink-800">Total Discussions</div>
            </div>
          </div>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100/40 flex items-center justify-center text-amber-800">
              <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-800">{activeMembers}</div>
              <div className="text-sm text-ink-800">Active Members</div>
            </div>
          </div>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-green-700">
              <FontAwesomeIcon icon={faBookmark} className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">{savedPosts}</div>
              <div className="text-sm text-ink-800">Saved Posts</div>
            </div>
          </div>
        </li>
      </ul>
    </aside>
  );
}
