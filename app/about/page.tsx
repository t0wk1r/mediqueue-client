import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { BookOpen, CalendarCheck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-14 dark:bg-slate-950">
        <section className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold text-[var(--primary)]">About Us</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              About MediQueue
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-slate-600 dark:text-slate-400">
              MediQueue is a smart tutor booking platform that helps students
              find tutors, check available slots, and book learning sessions
              easily.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "For Students",
                text: "Students can browse tutors by subject, location, time and teaching mode.",
              },
              {
                icon: BookOpen,
                title: "For Tutors",
                text: "Tutors can create profiles, manage slots and reach more students.",
              },
              {
                icon: CalendarCheck,
                title: "Easy Booking",
                text: "The system prevents slot conflicts and manages session bookings smoothly.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-7 shadow-sm dark:bg-slate-900"
              >
                <item.icon className="text-[var(--primary)]" size={40} />
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}