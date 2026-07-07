export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-10 pt-16">
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-36 w-36 rounded-full bg-amber-200/50 blur-3xl" />

      <div className="mx-auto max-w-7xl rounded-[2rem] border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-amber-100/95 p-8 shadow-2xl shadow-amber-200/30">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-purple-950 px-4 py-2 text-white shadow-lg shadow-purple-950/20">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200 text-lg font-bold text-purple-950">CC</span>
              <span className="text-sm uppercase tracking-[0.32em]">Coursework Commons</span>
            </div>
            <div className="space-y-3">
              <h2 className="max-w-xl text-3xl font-semibold text-ink-950 sm:text-4xl">A memorable study hub your students will love.</h2>
              <p className="max-w-2xl text-sm leading-7 text-ink-900/80">
                Showcase saved discussions, curated course notes, and an elegant learning experience that feels polished from first impression to final review.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-purple-100 bg-white/90 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-amber-700">Fast review</p>
                <p className="mt-2 text-sm text-ink-900/85">Smart filters and saved posts make it easy to find the most important discussions.</p>
              </div>
              <div className="rounded-[1.5rem] border border-purple-100 bg-white/90 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-amber-700">Community first</p>
                <p className="mt-2 text-sm text-ink-900/85">A calm design that encourages participation without overwhelming the learner.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4 rounded-[1.5rem] border border-amber-200/90 bg-white/85 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-purple-700">Quick links</p>
              <ul className="space-y-2 text-sm text-ink-900/85">
                <li>
                  <a href="#" className="transition hover:text-purple-950">Help center</a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-purple-950">Course settings</a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-purple-950">Saved posts</a>
                </li>
              </ul>
            </div>
            <div className="space-y-4 rounded-[1.5rem] border border-amber-200/90 bg-white/85 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-purple-700">Connect</p>
              <ul className="space-y-2 text-sm text-ink-900/85">
                <li>
                  <a href="#" className="transition hover:text-purple-950">Contact us</a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-purple-950">Privacy policy</a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-purple-950">Terms</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-amber-200/80 pt-6 text-sm text-ink-900/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Coursework Commons. Built for clear course conversations and memorable student review.</p>
          <div className="flex flex-wrap gap-3 text-sm text-ink-900/80">
            <a href="#" className="rounded-full border border-amber-200 bg-white px-4 py-2 transition hover:bg-amber-100">Request demo</a>
            <a href="#" className="rounded-full border border-amber-200 bg-white px-4 py-2 transition hover:bg-amber-100">Schedule tour</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
