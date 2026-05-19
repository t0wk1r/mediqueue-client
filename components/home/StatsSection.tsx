import { BookOpen, CalendarCheck, GraduationCap, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Active Students",
  },
  {
    icon: GraduationCap,
    value: "100+",
    label: "Expert Tutors",
  },
  {
    icon: CalendarCheck,
    value: "1K+",
    label: "Booked Sessions",
  },
  {
    icon: BookOpen,
    value: "20+",
    label: "Subjects",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 rounded-3xl bg-[var(--primary-light)] p-6 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-slate-950"
            >
              <item.icon
                className="mx-auto mb-3 text-[var(--primary)]"
                size={34}
              />

              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </h3>

              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}