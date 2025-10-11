export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="p-6">
      <span className="sr-only">Loading events…</span>

      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800 motion-reduce:animate-none" />

      <ul className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="rounded border border-neutral-200 dark:border-neutral-800 p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="h-6 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
              <div className="h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
            </div>

            <div className="flex gap-2 mb-3">
              <span className="h-6 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
              <span className="h-6 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
              <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse motion-reduce:animate-none" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}