import { BookOpen, CalendarCheck, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: BookOpen,
    title: "Subject Based Tutors",
    text: "Find tutors for Mathematics, Physics, English, ICT and more.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Session Booking",
    text: "Book sessions based on tutor availability and available slots.",
  },
  {
    icon: ShieldCheck,
    title: "Organized Learning",
    text: "Manage booked sessions with status and digital booking flow.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <p className="font-semibold text-[var(--primary)]">Why Choose Us</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Smart tutor booking experience
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            MediQueue makes tutor finding and session booking simple.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg dark:bg-slate-950"
            >
              <item.icon className="mb-4 text-[var(--primary)]" size={38} />

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}