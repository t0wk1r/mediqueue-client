import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-12">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary-light)]">
            <SearchX className="text-[var(--primary)]" size={48} />
          </div>

          <h1 className="mt-8 text-7xl font-black text-[var(--primary)] md:text-8xl">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
            Page Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
            Sorry, the page you are looking for doesn&apos;t exist or may have
            been moved.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white hover:bg-[var(--primary-hover)]"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] dark:border-slate-700 dark:text-slate-200"
            >
              <ArrowLeft size={18} />
              Browse Tutors
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}