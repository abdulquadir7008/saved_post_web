import type { ReactNode } from "react";

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="glass-panel mx-auto max-w-2xl rounded-[2rem] border border-white/10 px-10 py-14 text-center shadow-[0_40px_120px_-60px_rgba(0,0,0,0.7)]">
      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-200 shadow-lg shadow-cyan-500/10">
        <span className="text-xl">✨</span>
      </div>
      <p className="font-display text-3xl text-white">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-300">{body}</p>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
