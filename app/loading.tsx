import Image from "next/image";

export default function Loading() {
  return (
    <div
      aria-live="assertive"
      aria-busy="true"
      className="fixed inset-0 z-50 grid place-items-center bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/assets/images/logo/sun-only-logo.webp"
          alt="Loading"
          width={96}
          height={96}
          priority
          className="h-20 w-20 animate-spin motion-reduce:animate-none"
        />
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Loading…
        </p>
      </div>
    </div>
  );
}