import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faClock, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

export function SavedOverview({ total, topics, readingTime }: { total: number; topics: number; readingTime: string }) {
  return (
    <div className="space-y-5 rounded-[2rem] border border-slate-100 bg-white/90 p-6 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.25)]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink-900/70">Your saved overview</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <FontAwesomeIcon icon={faBookmark} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-ink-950">{total}</p>
              <p className="text-sm text-ink-800/70">Total saved posts</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <FontAwesomeIcon icon={faLayerGroup} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-ink-950">{topics}</p>
              <p className="text-sm text-ink-800/70">Different topics</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-[1.5rem] border border-slate-100 bg-slate-50 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
              <FontAwesomeIcon icon={faClock} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-ink-950">{readingTime}</p>
              <p className="text-sm text-ink-800/70">Saved reading time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
