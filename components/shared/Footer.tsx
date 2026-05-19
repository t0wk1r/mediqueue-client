import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--primary)]">MediQueue</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            A smart tutor booking platform for students and learning sessions.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Services</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>Online Tutoring</p>
            <p>Offline Tutoring</p>
            <p>Subject Based Learning</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Quick Links</h3>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/" className="block text-slate-600 dark:text-slate-400">Home</Link>
            <Link href="/tutors" className="block text-slate-600 dark:text-slate-400">Tutors</Link>
            <Link href="/login" className="block text-slate-600 dark:text-slate-400">Login</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Contact</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>Email: support@mediqueue.com</p>
            <p>Phone: +880 1700-000000</p>
            <p>Follow: Facebook | LinkedIn | X</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-800">
        © {new Date().getFullYear()} MediQueue. All rights reserved.
      </div>
    </footer>
  );
}