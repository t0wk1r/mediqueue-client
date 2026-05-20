import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";
import { CheckCircle, GraduationCap, Users } from "lucide-react";

export default function BecomeTutorPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-14 dark:bg-slate-950">
        <section className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div>
            <p className="font-semibold text-[var(--primary)]">
              Become a Tutor
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              Share your knowledge with students
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Create your tutor profile, add your availability, and start
              receiving session bookings from students.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Create your tutor profile easily",
                "Set subject, fee, slot and teaching mode",
                "Manage your created tutors from dashboard",
              ].map((item) => (
                <p key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-[var(--primary)]" size={22} />
                  <span className="text-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                </p>
              ))}
            </div>

            <Link
              href="/add-tutor"
              className="mt-8 inline-block rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white hover:bg-[var(--primary-hover)]"
            >
              Start Teaching Today
            </Link>
          </div>

          <div className="grid gap-5">
            <Card icon={GraduationCap} title="Teach Your Subject" />
            <Card icon={Users} title="Reach More Students" />
            <Card icon={CheckCircle} title="Control Your Availability" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Card({ icon: Icon, title }: any) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm dark:bg-slate-900">
      <Icon className="text-[var(--primary)]" size={38} />
      <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
    </div>
  );
}