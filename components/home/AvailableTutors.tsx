import Link from "next/link";
import {CalendarDays, Clock, MapPin, Monitor, Star, Users } from "lucide-react";


type Tutor = {
  _id: string;
  tutorName: string;
  photo: string;
  subject: string;
  location: string;
  teachingMode: string;
  hourlyFee: number;
  totalSlot: number;
  experience?: string;
  availableDays: string;
availableTime: string;
sessionDate: string;
};

async function getTutors(): Promise<Tutor[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors?limit=6`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return data?.data || [];
  } catch {
    return [];
  }
}

export default async function AvailableTutors() {
  const tutors = await getTutors();

  return (
    <section className="bg-white py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-semibold text-[var(--primary)]">
              Available Tutors
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Book from our expert tutors
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Explore verified tutor profiles and book your preferred learning
              session based on subject, time and teaching mode.
            </p>
          </div>

          <Link
            href="/tutors"
            className="rounded-xl border border-[var(--primary)] px-5 py-3 text-center font-semibold text-[var(--primary)] hover:bg-[var(--primary-light)]"
          >
            View All Tutors
          </Link>
        </div>

        {tutors.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <Users className="mx-auto text-[var(--primary)]" size={42} />
            <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              No tutors available yet
            </h3>
            <p className="mt-2 text-slate-500">
              After adding tutors, 6 tutors will show here from database.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative">
                  <img
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[var(--primary)] backdrop-blur dark:bg-slate-950/80">
                    {tutor.subject}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {tutor.tutorName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {tutor.experience || "Experienced Tutor"}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-sm font-semibold text-yellow-600">
                      <Star size={14} fill="currentColor" />
                      4.9
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-2">
  <div className="space-y-2">
    <p className="flex items-center gap-2">
      <MapPin size={16} className="text-[var(--primary)]" />
      {tutor.location}
    </p>

    <p className="flex items-center gap-2">
      <Monitor size={16} className="text-[var(--primary)]" />
      {tutor.teachingMode}
    </p>
  </div>

  <div className="space-y-2">
    <p className="flex items-start gap-2">
      <Clock size={16} className="mt-0.5 text-[var(--primary)]" />
      <span>
        {tutor.availableDays} - {tutor.availableTime}
      </span>
    </p>

    <p className="flex items-start gap-2">
      <CalendarDays size={16} className="mt-0.5 text-[var(--primary)]" />
      <span>
        {new Date(tutor.sessionDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    </p>
  </div>
</div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">
                      ৳{tutor.hourlyFee}
                      <span className="text-sm font-normal text-slate-500">
                        /hour
                      </span>
                    </p>

                    <p className="rounded-full bg-[var(--primary-light)] px-3 py-1 text-sm font-semibold text-[var(--primary)]">
                      {tutor.totalSlot} slots
                    </p>
                  </div>

                  <Link
                    href={`/tutors/${tutor._id}`}
                    className="mt-5 block rounded-xl bg-[var(--primary)] px-4 py-3 text-center font-semibold text-white hover:bg-[var(--primary-hover)]"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}