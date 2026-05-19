export default function HowItWorks() {
  return (
    <section className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2">
        <div className="rounded-3xl bg-[var(--primary-light)] p-8 dark:bg-slate-900">
          <p className="font-semibold text-[var(--primary)]">How It Works</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Book your tutor in 3 simple steps
          </h2>

          <div className="mt-8 space-y-5">
            {[
              "Create your account and login securely.",
              "Browse tutors and check available slots.",
              "Book a session and manage it from your dashboard.",
            ].map((step, index) => (
              <div key={step} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] font-bold text-white">
                  {index + 1}
                </span>

                <p className="pt-2 text-slate-700 dark:text-slate-300">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 p-8 dark:border-slate-800">
          <p className="font-semibold text-[var(--primary)]">
            Learning Modes
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Learn online or offline
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Students can choose tutors based on teaching mode, subject,
            location, time availability and session start date.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
              <h3 className="text-2xl font-bold text-[var(--primary)]">
                Online
              </h3>
              <p className="text-sm text-slate-500">Remote learning support</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
              <h3 className="text-2xl font-bold text-[var(--primary)]">
                Offline
              </h3>
              <p className="text-sm text-slate-500">Local tutor sessions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}