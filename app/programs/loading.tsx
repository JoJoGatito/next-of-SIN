export default function Loading() {
  return (
    <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16" role="status" aria-live="polite">
      <span className="sr-only">Loading programs…</span>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="mx-auto h-8 sm:h-10 w-64 max-w-full rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
          <div className="mt-3 h-5 w-80 max-w-full mx-auto rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-4"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl bg-neutral-200 dark:bg-neutral-800"
                aria-hidden="true"
              />
              <div className="pl-3 space-y-3">
                <div className="h-5 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
                <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
                <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
                <div className="mt-2 flex gap-2">
                  <span className="h-6 w-28 rounded-full border border-neutral-200 dark:border-neutral-700 bg-transparent" />
                </div>
                <div className="mt-2 h-5 w-24 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}