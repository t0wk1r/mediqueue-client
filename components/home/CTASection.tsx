import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-3xl bg-[var(--primary)] px-6 py-12 text-center text-white md:px-12">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-5xl">
            Ready to book your next learning session?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Browse tutors, check available slots, and start learning with the
            right mentor today.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/tutors"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[var(--primary)] hover:bg-slate-100"
            >
              Browse Tutors
            </Link>

            <Link
              href="/add-tutor"
              className="rounded-xl border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Add Tutor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}