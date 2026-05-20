import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--primary)]">
            MediQueue
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            A smart tutor booking platform for students and learning sessions.
          </p>

          <div className="mt-4 flex gap-3 text-sm font-semibold text-[var(--primary)]">
            <span>Facebook</span>
            <span>LinkedIn</span>
            <span>X</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Services
          </h3>

          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>Online Tutoring</p>
            <p>Offline Tutoring</p>
            <p>Subject Based Learning</p>
            <p>Session Booking</p>
            <p>Slot Management</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Quick Links
          </h3>

          <div className="mt-3 space-y-2 text-sm">
            <FooterLink href="/" label="Home" />
            <FooterLink href="/tutors" label="Tutors" />
            <FooterLink href="/about" label="About" />
            <FooterLink href="/faq" label="FAQ" />
            <FooterLink href="/contact" label="Contact" />
            <FooterLink href="/become-a-tutor" label="Become a Tutor" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Support
          </h3>

          <div className="mt-3 space-y-2 text-sm">
            <FooterLink href="/privacy-policy" label="Privacy Policy" />
            <FooterLink href="/terms-condition" label="Terms & Conditions" />
            <FooterLink href="/login" label="Login" />
            <FooterLink href="/register" label="Register" />
          </div>

          <div className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>Email: support@mediqueue.com</p>
            <p>Phone: +880 1700-000000</p>
            <p>Address: Rajshahi, Bangladesh</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-800">
        © {new Date().getFullYear()} MediQueue. All rights reserved.
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block text-slate-600 hover:text-[var(--primary)] dark:text-slate-400"
    >
      {label}
    </Link>
  );
}