export function PostCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30">
      <div className="h-5 w-3/5 rounded-full bg-slate-700" />
      <div className="mt-5 space-y-4">
        <div className="h-3 rounded-full bg-slate-700" />
        <div className="h-3 rounded-full bg-slate-700" />
        <div className="h-3 rounded-full bg-slate-700/90 w-5/6" />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="h-8 w-20 rounded-full bg-slate-700" />
        <span className="h-8 w-24 rounded-full bg-slate-700/80" />
      </div>
    </div>
  );
}
